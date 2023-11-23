import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json"
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', './quiz.response.css']
})
export class QuizComponent implements OnInit {

  title: string = ''
  questions: any
  questionSelected:any


  answers:string[] = []


  questionsIndex:number = 0
  questionMaxIndex:number = 0


  finished:boolean = false

  answerSelected: { resultsText: string, resultsImage: string | null } = {
    resultsText: '',
    resultsImage: null
  };
  constructor(){

  }

  ngOnInit(): void {
 if(quiz_questions){
  this.finished = false
  this.title = quiz_questions.title

  this.questions = quiz_questions.questions
  this.questionSelected = this.questions[this.questionsIndex]
  this.questionsIndex = 0
  this.questionMaxIndex = this.questions.length

  console.log(this.questionsIndex)
  console.log(this.questionMaxIndex)
 }
  }

  buttonPress(value:string){
 this.answers.push(value)
 this.anextStep()

 console.log(this.answers)

  }


  async anextStep() {
    this.questionsIndex += 1;

    if (this.questionMaxIndex > this.questionsIndex) {
      this.questionSelected = this.questions[this.questionsIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      const results = quiz_questions.results as Record<string, { text: string; image: string }>;
      this.answerSelected = {
        resultsText: results[finalAnswer]?.text || '',
        resultsImage: results[finalAnswer]?.image || null
      };
    }
  }
  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
        if(
arr.filter(item => item === previous).length >
arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })
    return result
  }

  //photoresult(): string {
 //   const resultKey: string = this.answerSelected || ''; // Use a chave do resultado, ou uma string vazia se não houver resultado
 //   const resultImage: string | undefined = questions.resultsPhoto[resultKey];

    // Se houver uma URL correspondente ao resultado, retorne essa URL, caso contrário, use uma imagem padrão
//return resultImage || 'caminho/para/imagem-padrao.jpg';
//  }
}


