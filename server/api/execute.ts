import {MockedResponse} from "~/server/types";
import {CodeLanguage} from "~/types";

export default defineEventHandler(async (event): Promise<MockedResponse> => {
    const body = await readBody(event); // Считываем тело запроса
    const { language, code } = body;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!language || !code) {
        return {
            status: 'error',
            error: 'Language or code is missing',
        };
    }

    if (language === CodeLanguage.JAVASCRIPT) {
        try {
            new Function(code);
            return {
                status: 'success',
                output: 'Hello, JavaScript!\n',
            };
        } catch (e) {
            return {
                status: 'error',
                error: 'Syntax error in JavaScript code',
            };
        }
    } else if (language === CodeLanguage.PYTHON) {
        if (code.includes('print') && code.includes('(') && code.includes(')')) {
            return {
                status: 'success',
                output: 'Hello, Python!\n',
            };
        } else {
            return {
                status: 'error',
                error: 'SyntaxError: Invalid syntax in Python code',
            };
        }
    } else if (language === CodeLanguage.GO) {
        if (code.includes('fmt.Println') && code.includes('package main')) {
            return {
                status: 'success',
                output: 'Hello, Go!\n',
            };
        } else {
            return {
                status: 'error',
                error: 'SyntaxError: Invalid syntax in Go code',
            };
        }
    } else {
        return {
            status: 'error',
            error: 'Unsupported language',
        };
    }
});