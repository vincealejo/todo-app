export default function getTommorowDate(){
    const ONE_DAY_IN_MILLISECONDS = 86400000;
    const nowInMilliseconds = new Date().getTime();
    const tommorowInMilliseconds = nowInMilliseconds + ONE_DAY_IN_MILLISECONDS;
    
    const tommorow = new Date(tommorowInMilliseconds);
    const year = tommorow.getUTCFullYear();
    const month = tommorow.getUTCMonth() + 1;
    const day = tommorow.getUTCDate();


    return `${year}-${month}-${day < 10 ? "0" + day : day}`;

}