const calc_color= (percent: number, start: number, end: number) => {
    let a = percent / 100,
    b = (end - start)*a,
    c = b + start;
  
    return "hsl(" + c + ", 100%, 50%)";
}

const check_score_boundary = (score: number, max: number) => {
    score = Math.round((score / max ) * 100)
    if (score >= 85 ) return "excellent"
    if (score >= 60) return "good"
    if (score < 60) return "poor"
    return "none"
}

const performance_color_coding = (score: string) => {
    switch(score){
        case "poor":
            return <p className="text-danger"> Poor </p>
        case "good":
            return <p className="text-warning"> Good </p>
        case "excellent":
            return <p className="text-success"> Excellent </p>
        default:
            return <p className="text-secondary"> N/A </p>
    }
}

export {performance_color_coding, calc_color, check_score_boundary};