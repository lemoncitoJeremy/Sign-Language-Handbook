import { DoubleTimeChart, HalfCircularProgress, TimeChart } from "../chart/graphs"
import { performance_color_coding, check_score_boundary } from "../utilities/color-coding";

function ModelAccuracy(props: any){
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col p-3">
                    <p className="h3 model-accuracy-title">Model Accuracy</p>
                </div>
            </div>
            <div className="row">
                <div className="col p-4 perf-graph">
                    <DoubleTimeChart
                        width={props.width}
                        height={props.height}
                        data={props.data}
                    />
                </div>
                <div className="col">
                    <div className="model-title">
                        <div className="d-flex">
                            <div className="circle-icon bg-warning d-inline">

                            </div>
                            <p className="h5 d-inline model-name">
                                Current Model
                            </p>
                        </div>
                        <div className="d-flex">
                            <div className="circle-icon bg-primary d-inline">

                            </div>
                            <p className="h5 d-inline model-name">
                                Previous Model
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CircularProgress(props: any){
    return(
        <div className="card progress-bar">
            <div className="card-header border-0 progress-header">
                <p className="h4">Atomic Users Total Average Score</p>
            </div>
            <div className="card-body progress-body">
                <HalfCircularProgress
                    percentage={props.score}
                    max={props.max}
                /> 
                <div className="performance-progress">
                    {performance_color_coding(check_score_boundary(props.score, props.max))}
                </div>
            </div>
        </div>  
    )
}

function LineGraphStats(props: any){
    return(
        <div className="card user-dash">
            <div className="card-header border-0 bg-white">
                <p className="h3 mt-5 ms-4">
                    {props.title}
                </p>
                <p className="h1 mt-1 ms-4">
                    {props.number}
                </p>
            </div>
            <div className="card-body w-100">
                <TimeChart
                    width={props.width}
                    height={props.height}
                    data={props.data}
                />
            </div>
        </div>
    )
}


export {ModelAccuracy, CircularProgress, LineGraphStats};