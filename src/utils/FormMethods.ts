
export const mapStringToNumbers = (arr:string[] | undefined) => {
    return arr? arr.map(item => parseInt(item,10)):[]
}