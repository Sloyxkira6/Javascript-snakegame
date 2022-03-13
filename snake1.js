window.onload = () => {
    let stage = document.getElementById('canvas')
    let context = stage.getContext('2d')
    document.addEventListener('keydown', keypush)
    //vai ficar esperando alguma tecla ser precionada
    setInterval(game, 60)
    //vai dizer o time do jogo 
    const vel = 1
    let vx = vy = 0
    let px = 10 //posicao horizontal da cabeca da cobra
    let py = 15 //posicao vertical da cabeca da cobra
    let tp = 30 //tamanho de cada bloco
    let qp = 20 //quantidade de blocos
    let ax = ay = 15 //posicao inicial da maca
    let pontos = 1
    let trail = [] //rastro da cobra
    let tail = 5//tamanho da calda

    function game(){
        px += vx;
        py += vy;
            if(px<0){ // se a cobra chegar no comeco ela precisa voltar pro final
                px= qp-1
            }
            if(px>qp-1){ // se a cobra chegar no final ela precisa voltar pro comeco
                px= 0
            }
            if(py<0){
                py= qp-1
            }
            if(py>qp-1){
                py=0
            }
        //colorindo o tabuleiro
        context.fillStyle = 'black'
        context.fillRect(0, 0, stage.width, stage.height)

        context.fillStyle = 'red'
        context.fillRect(ax*tp, ay*tp, tp, tp)
            //parametros: cordenada x e y, largura e altura

        context.font = "20px Arial"
        context.fillStyle ="#00FF42"
        context.fillText(`scores: ${pontos}`, canvas.width -120, 18)

        context.fillStyle = 'gray'
        for(let i = 0; i<trail.length; i++){
            context.fillRect(trail[i].x*tp, trail[i].y*tp, tp, tp) //aqui ele vai pintar o rastro e despintar depois que a cobra passar
            //coordenadas do rastro da cobra, altura e largura
            
            if(trail[i].x==px && trail[i].y ==py){ //vai conferir se a cobra bate em algum bloco do rastro pra dar game over
                vx = vy = 0
                
                tail = 5
                pontos = 1
                //isso vai para a velocidade da cobra, para dar game over
            }
        }

        trail.push({x:px, y:py }) //criando um objeto 
        //cada bloco do rastro vai ser adicionado um objeto que vai ter a cordenadas x e y
        //que vao receber coordenadas py e px
        while(trail.length > tail) { //se o tamanho do rastro tiver maior que a cauda
            trail.shift(); //vai tirar o primeiro elemento

        }
        if(ax==px && ay==py){ //se a posicao da maca for igual a da cabeca da cobra
            tail++ //vai ser adicionado um novo elemento a calda da cobra
            pontos++
            ax = Math.floor(Math.random()*qp); //depois a maca vai tomar outra posicao aleatoria
            ay = Math.floor(Math.random()*qp); //do tabuleiro
        }
    }

    function keypush(event){//a funcao vai receber um evento, que vai ser o click de uma tecla
        //se a teclar clicada for a da esquerda(cod: 37) a cobra vai para a esquerda
        switch(event.keyCode) {
            case 37: //esquerda
                vx = -vel
                vy = 0
            break
            case 38: //cima
                vx = 0
                vy = -vel
            break
            case 39: //direita
                vx = vel
                vy = 0
            break
            case 40: //baixo
                vx = 0
                vy = vel
            break
            default:

            break
        }
    }
    
}


