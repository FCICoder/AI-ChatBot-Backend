import { Configuration } from 'openai';
export const configureOpenAi = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID
    });
    return config;
};
//# sourceMappingURL=openAi-config.js.map