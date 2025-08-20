declare module '*.css' {
    const styles: string;
    export default styles;
}

declare module '*.css?inline' {
    const content: string;
    export default content;
}
