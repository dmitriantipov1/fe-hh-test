import {CodeLanguage} from "~/types";

export const codeLanguagesArray = ['go', 'javascript', 'python'];

export const defaultCodeSamples: Record<CodeLanguage, string> = {
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Go!")\n}',
    javascript: "console.log('Hello, JavaScript!');",
    python: "print('Hello, Python!')",
};