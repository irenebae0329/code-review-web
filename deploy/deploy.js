// scripts/deploy.js
import { NodeSSH } from 'node-ssh';
import archiver from 'archiver';
import fs from 'fs';

const ssh = new NodeSSH();

// === 部署配置 ===
const config = {
  host: '39.97.170.225',
  username: 'root',
  remoteDir: '~/',  // 服务器部署目录
  deployTmp: '~/',    // 临时上传目录
  password:'2323232Asd!'
};

// === 1️⃣ 本地构建 ===
async function build() {
  console.log('📦 正在构建 Next.js 项目...');
  const { execSync } = await import('child_process');
  execSync('pnpm install && pnpm build', { stdio: 'inherit' });
}

// === 2️⃣ 打包 ===
async function zipBuild() {
  console.log('🗜️ 正在打包构建产物...');
  const output = fs.createWriteStream('next-build.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory('.next', '.next');
  archive.directory('public', 'public');
  archive.file('package.json', { name: 'package.json' });
  archive.file('pnpm-lock.yaml', { name: 'pnpm-lock.yaml' });
  archive.file('next.config.js', { name: 'next.config.js' });

  await archive.finalize();
}

// === 3️⃣ 上传并部署 ===
async function deploy() {
  console.log('🚀 正在连接服务器...');
  await ssh.connect({
    host: config.host,
    username: config.username,
    passphrase: config.password,
  });

  console.log('📤 上传中...');
  await ssh.putFile('next-build.zip', `${config.deployTmp}/next-build.zip`);

  console.log('📦 解压并部署...');
  const commands = [
    `cd ${config.deployTmp}`,
    `unzip -o next-build.zip -d ${config.remoteDir}`,
    `cd ${config.remoteDir}`,
    `pm2 reload next-app || pm2 start npm --name "next-app" -- run start`,
    `pm2 save`,
  ];
  await ssh.execCommand(commands.join(' && '));
  console.log('✅ 部署成功！');

  const cleanupCommands = [
    `rm -rf ${config.remoteDir}/next-build.zip`,
  ];
  await ssh.execCommand(cleanupCommands.join(' && '));
  console.log('🧹 清理完成！');

  ssh.dispose();
}

// === 主函数 ===
(async () => {
  await build();
  await zipBuild();
  await deploy();
})();
