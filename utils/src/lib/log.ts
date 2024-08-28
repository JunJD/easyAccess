export const funLog = (funName: string, ...args: Function[]) => {
    for (const fn of args) {
        console.log(`%c${funName}`, 'color: #0091ea', fn());
    }
}