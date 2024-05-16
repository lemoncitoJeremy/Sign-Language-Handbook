import { PracticeCard } from "../components/card/card_practice_page";
import ProblemTable from "../components/table/problem_table";


function NoAsidePractice(props: any){

    return(
        <div className="row ms-4 mt-5">
            <div className="col">
                <PracticeCard
                    name="Fingerspelling Practice"
                    desc="Practice recognizing and fingerspelling words from the alphabet lesson."
                    score="0/0"
                />
            </div>
        </div>
    )
}

export default NoAsidePractice;