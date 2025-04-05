export function compareCode(userCode: string, correctCode: string): boolean {
    const clean = (code: string) =>
      code.replace(/\s+/g, "").replace(/[\r\n]/g, "").trim()
  
    return clean(userCode) === clean(correctCode)
  }
  