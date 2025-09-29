import { buildApp } from '@/app.js';
import { env } from '@/config/env.js';

const start = async (): Promise<void> => {
  try {
    const app = await buildApp();

    const address = await app.listen({
      host: env.HOST,
      port: env.PORT,
    });

    console.log(`
🚀 ArcFit API Server iniciado com sucesso!

📊 Informações do servidor:
   • URL: ${address}
   • Ambiente: ${env.NODE_ENV}
   • Documentação: ${address}/docs (Scalar API Reference 🎨)
   • Health Check: ${address}/health
   
🔧 Recursos disponíveis:
   • ✅ OpenAPI 3.0 Documentation (Scalar)
   • ✅ JWT Authentication
   • ✅ Rate Limiting
   • ✅ CORS Protection
   • ✅ Security Headers (Helmet)
   • ✅ Database Connection (PostgreSQL + Drizzle)
   
🎯 Pronto para receber requisições!
    `);

  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`\n📤 Recebido sinal ${signal}. Encerrando servidor...`);
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start server
start();