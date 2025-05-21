// next.config.js
const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = 'digitalNEST-ecommerce';

module.exports = {
    output: 'export',
    basePath: isGithubPages ? `/${repoName}` : '',
    assetPrefix: isGithubPages ? `/${repoName}/` : '',
    images: {
        unoptimized: true,
    },
};
