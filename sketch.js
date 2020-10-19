/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>

 */
let bildOriginal; // Declare variable 'img'.
let value = 0;
let anfangX = 0;
let anfangY = 0;
let endeX = 0;
let endeY = 0;
let farbe;
let dx;
let dy;
let xx;
let yy;
let aufziehen = false;
let erfassungFertig = 0;
let rechteck = [];
let helligkeit;
let gesamtHelligkeit = 0;
let kurve = [];
let json = {}; // new  JSON Object
json.id = 0;
json.name = 'spektrogramm';

function preload() {
  bildOriginal = loadImage('img0332 1s gluehbirne hgcd ioddampf.png');
}


function mouseDragged() {
  if ( !aufziehen ) {
    aufziehen = 1;
    rechteck[0] = 0;
    rechteck[1] = mouseY;
    rechteck[2] = 720;
    rechteck[3] = mouseY;
  }
}


function mouseReleased() {
  if ( aufziehen ) {
    aufziehen = 0;
    erfassungFertig = 1;
    save(kurve, 'spektrogramm.csv');
    saveJSON(kurve, 'spektrogramm.json');
  } 
}

  
function setup() {
  createCanvas(720, 400);
  smooth();
  //noLoop();
  stroke(200);
  fill(200);
  strokeWeight(1);
  frameRate(5);
  frameRate(5);
}

function auswerten() {
  dx = 720;
  
    
  for (let i = 0; i < dx; i++) {
    
    xx = rechteck[0] + i;
    
    helligkeit = 0;
    gesamtHelligkeit = 0;
    let intensitaet = 0;
    
    for (let zz = 0; zz < 20; zz++) {
      yy = rechteck[1] + zz;
      farbe = get(xx, yy);
      helligkeit = brightness(farbe);
      gesamtHelligkeit += helligkeit;
    }
    intensitaet = gesamtHelligkeit / 20.0;
    
    kurve[i] = intensitaet;
    intensitaet = 0;
    print(kurve);
  } 
  /*
  for (let i = 0; i < dx; i++) {
      xx = rechteck[0] + i;
      yy = rechteck[1];
      farbe = get(xx, yy);
      helligkeit = brightness(farbe);
      kurve[i] = helligkeit;
  } 
  */
  push();
  noFill();
  stroke(200);
  for (let k = 0; k < dx; k++) {
    point(k, 400-kurve[k]);
    if (k > 0) {
      line(k-1, 400-kurve[k-1], k, 400-kurve[k]);
    }
  }

  pop();
  
  rect(rechteck[0], rechteck[2], dx, dy);
  
  
  
  noLoop();
    
}


function draw() {
  //image(bildOriginal, 0, 0, 720, 400, 0, 0, 5184, 3486);
  image(bildOriginal, 0, 0, 720, 400, 0, 0, bildOriginal.width, bildOriginal.height);
  line(0, mouseY, bildOriginal.width, mouseY);
  line(mouseX, 0, mouseX, bildOriginal.height);
  
  if (aufziehen === 1 && erfassungFertig === 0) {
    //line(0, mouseY, bildOriginal.width, mouseY);
    //line(mouseX, 0, mouseX, bildOriginal.height);
    dx = rechteck[2] - rechteck[0];
    dy = rechteck[3] - rechteck[1];
    rect(rechteck[0], rechteck[1], rechteck[2] - rechteck[0], rechteck[3] - rechteck[1]);
  }
    
  if (aufziehen === 0 && erfassungFertig === 1) {
    auswerten();    
  }
  
  if (aufziehen === 0 && erfassungFertig === 1) {
    auswerten(); 
    push();
    stroke(color(200));
    fill(200);
    rect(rechteck[0], rechteck[1], rechteck[2] - rechteck[0], rechteck[3] - rechteck[1]);
    pop();
  }
  
  textSize(12);
  noFill();
  strokeWeight(1);
  textStyle(NORMAL);
  text('Ziehen Sie mit der Maus einen Bereich des Spektrogrammes auf.', 10, 22);
  
}
  

