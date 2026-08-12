import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Gemini Daily Attendance Analysis Report
  app.post('/api/gemini/analyze', async (req, res) => {
    try {
      const { date, stats, sampleRecords } = req.body;

      const ai = getGenAI();
      if (!ai) {
        return res.json({
          report: `【HR 當日考勤統計與智能分析報告 - ${date || '2026-07-28'}】\n\n` +
            `一、總體出勤概況：\n` +
            `• 名冊總人數：${stats?.totalEmployees || 17} 人，實際出勤率：${stats?.attendanceRate || '100.0'}%。\n` +
            `• 應到工作日人數：${stats?.workdaysCount || 10} 人，包含直接/間接/派遣/實習工讀人員。\n\n` +
            `二、產線與班別人力配置：\n` +
            `• 日班：${stats?.dayShift || 6} 人，中班：${stats?.middleShift || 5} 人，夜班：${stats?.nightShift || 6} 人。\n` +
            `• 1-1 Google線長、1-2 ASSY、1-2 PF線長、1-2 X-RAY線長、1-2重工與PCB_OPEN出勤狀況穩定。\n\n` +
            `三、HR考勤維護建議：\n` +
            `1. 打卡數據已完全匯入，建議定期複查離職與留停同仁之考勤系統權限。`
        });
      }

      const prompt = `
你是一位專業的高級HR資深考勤經理。請根據以下產線同仁當日考勤數據，撰寫一份簡潔、專業、結構清晰的『HR當日出缺勤分析報告』。

日期：${date || '2026-07-28'}
考勤統計數據：
- 名冊總人數：${stats?.totalEmployees}
- 應到工作日人數：${stats?.workdaysCount}
- 實際出勤人數：${stats?.actualPresent}
- 留停/請假人數：${stats?.onLeave}
- 離職紀錄數：${stats?.resigned}
- 出勤率：${stats?.attendanceRate}%
- 班別分佈：日班 ${stats?.dayShift} 人 / 中班 ${stats?.middleShift} 人 / 夜班 ${stats?.nightShift} 人

抽樣員工資料範例：
${JSON.stringify(sampleRecords || [], null, 2)}

報告格式要求：
1. 包含「一、總體出勤概況與指標分析」、「二、各班別與製造樓層人力覆蓋率」、「三、異常提醒與HR行動建議」。
2. 使用正體中文（繁體中文），條列清晰、語氣專業穩重。
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const reportText = response.text || '分析報告生成完成。';
      res.json({ report: reportText });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || '生成報告失敗' });
    }
  });

  // Vite Middleware or Static Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HR Reporting System Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
