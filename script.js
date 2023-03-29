let len = document.querySelectorAll(".cell").length
let cells = document.querySelectorAll(".cell")



let cells_obj = {play:true}
let player_x = {play:true, card:"x"}
let player_o = {play:false, card: "o"}
let x="", y="", z=""; 




function playtoggle(){
   if (player_x.play){
        player_x.play = false
        player_o.play =true
        turn = player_o.card}
   else {
        turn = player_x.card
        player_x.play = true
        player_o.play =false}
}

function toggle_win_color(x,y,z){
    document.querySelector(`.${x}`).classList.toggle("winner_green")
    document.querySelector(`.${y}`).classList.toggle("winner_green")
    document.querySelector(`.${z}`).classList.toggle("winner_green")
}

function announcewin(x,y,z, current_player){
    toggle_win_color(x,y,z)
    cells_obj.play = false 
    let score  = localStorage.getItem(current_player.card)

    score++;
    document.querySelector(`.player_${current_player.card}s`).textContent = score
    localStorage.setItem(current_player.card, score)
         

}


function checkdraw(){
    for(let x = 0; x <len; x++)
        if (cells[x].textContent ==="")
            return false     
    return true
}


function restart(event){
      for(i=0; i<cells.length; i++)
    {
        cells[i].textContent=undefined;
    }
    cells_obj ={}
    cells_obj.play = true
    toggle_win_color(x,y,z)
    player_x.play = true
}



function play_xo(event){

        // check playing,toggle, assign card to div 
        let card = player_x.play ? player_x.card : player_o.card;
        let current_player = player_x.play ? player_x : player_o;
       

        

        if (this.textContent==="" && cells_obj.play){
            this.textContent= card;
            playtoggle()}
        
        cells_obj[this.classList[0]] =  card;
  
   
        // check if there is a winner
        if (cells_obj.one!== undefined && cells_obj.one === cells_obj.five  && 
            cells_obj.five === cells_obj.nine && cells_obj.play) { 
                        [x, y, z] = ["one","five","nine"]
                        announcewin(x,y,z, current_player)}
            
        else if  (cells_obj.seven!== undefined && cells_obj.seven === cells_obj.five  && 
            cells_obj.five === cells_obj.three && cells_obj.play) {
                [x, y, z] = ["seven","five","three"]
            announcewin(x,y,z, current_player)}

        else if  (cells_obj.one!== undefined && cells_obj.one === cells_obj.four  && 
            cells_obj.four === cells_obj.seven && cells_obj.play) {
                [x, y, z] = ["one","four","seven"]
                announcewin(x,y,z, current_player)}

        else if  (cells_obj.two!== undefined && cells_obj.two === cells_obj.five  && 
            cells_obj.five === cells_obj.eight && cells_obj.play) {
                [x,y,z] = ["two","five","eight"]
            announcewin(x,y,z, current_player)}

        else if  (cells_obj.three!== undefined && cells_obj.three === cells_obj.six  && 
            cells_obj.six === cells_obj.nine && cells_obj.play) {
                [x,y,z] = ["three","six","nine"]
            announcewin(x,y,z, current_player)}

        else if  (cells_obj.one!== undefined && cells_obj.one === cells_obj.two  && 
            cells_obj.two === cells_obj.three && cells_obj.play){
                [x,y,z] = ["one","two","three"]
            announcewin(x,y,z, current_player)}

        else if  (cells_obj.four!== undefined && cells_obj.four === cells_obj.five  && 
            cells_obj.five === cells_obj.six && cells_obj.play){
                [x,y,z] = ["four","five","six"]
            announcewin(x,y,z, current_player)}

        else if  (cells_obj.seven!== undefined && cells_obj.seven === cells_obj.eight  && 
            cells_obj.eight === cells_obj.nine && cells_obj.play){
                [x,y,z] = ["seven","eight","nine"]
            announcewin(x,y,z, current_player)}

        //checking for a draw 
       if (checkdraw()){
            console.log("draw")
            player_x.play = false
       }

      
       document.querySelector(".turn").textContent = `${turn}'s turn`
       localStorage.setItem('turn', turn)
}






if (!localStorage.getItem('x') || !localStorage.getItem('x')){
    localStorage.setItem('x', 0)
    localStorage.setItem('o', 0)
    
}

let score_x = localStorage.getItem('x')
let score_o = localStorage.getItem('o')

document.querySelector(".player_xs").textContent = score_x
document.querySelector(".player_os").textContent = score_o



for(let x = 0; x <len; x++){
    
    cells[x].addEventListener("click", play_xo)
} 

document.querySelector(".restart").addEventListener("click", restart)


