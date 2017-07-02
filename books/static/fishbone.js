console.clear();

var paper = Snap(400,400);

//var block = paper.rect(50, 50, 100, 100, 20, 20);



var height = 400;
var width  = 400;

var cmp_y = 50;
var cmp_ydif = 15;
var txtbuff = 9;
var wordbuff = 30;

na = paper.text(txtbuff,cmp_y - 1 - 2,'137');
k = paper.text(txtbuff,cmp_y + txtbuff,'4.5');
cl = paper.text(txtbuff + (wordbuff), cmp_y - 1 - 2,'131');
co3 = paper.text(txtbuff + (wordbuff), cmp_y + txtbuff,'21');
bun = paper.text(txtbuff + (wordbuff * 2), cmp_y - 1 - 2,'10');
cr = paper.text(txtbuff + (wordbuff * 2), cmp_y + txtbuff,'1.0');
gluc = paper.text(txtbuff + (wordbuff * 3), cmp_y + 4.5 - .5,'99');

cmp_txt = paper.group(na, k, cl, co3, bun, cr, gluc);

//cmp_txt.attr({ fill: "#900", "font-size": txtbuff, "text-anchor": "end"});

//cmp_txt.attr({ fill: "#900", "font-size": txtbuff, "text-anchor": "middle"});

cmp_txt.attr({ fill: "#900", "font-size": txtbuff});


//block.attr({
//  height: (cmp_txt.node.clientHeight + 5)
//});

cmp1 = paper.line(0,cmp_y,90-5,cmp_y);
cmp2 = paper.line(wordbuff,cmp_y+cmp_ydif,wordbuff,cmp_y-cmp_ydif);
cmp3 = paper.line(wordbuff * 2,cmp_y+cmp_ydif,wordbuff * 2,cmp_y-cmp_ydif);
cmp4 = paper.line((wordbuff * 3) - 5,cmp_y,wordbuff * 3,cmp_y+cmp_ydif);
cmp5 = paper.line((wordbuff * 3) - 5,cmp_y,wordbuff * 3,cmp_y-cmp_ydif);

cmp_fb = paper.group(cmp1, cmp2, cmp3, cmp4, cmp5);

cmp_fb.attr( {
   fill: "#ff0000", 
   stroke: "#0000ff", 
   strokeWidth: 1
})