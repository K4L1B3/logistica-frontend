# Escolha uma imagem de base oficial do Node.js
FROM node:22.6.0-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependência e instale as dependências
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copie o resto dos arquivos do seu projeto Next.js
COPY . .

# Construa sua aplicação Next.js
RUN npm run build

# Exponha a porta que o Next.js roda (por padrão é a 3000)
EXPOSE 4000

# Comando para iniciar sua aplicação
CMD ["npm", "start"]
