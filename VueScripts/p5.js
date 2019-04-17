new Vue({
    el: '#sim',
    methods: {
        setup(sketch) {
            sketch.createCanvas(1000, 500);
            sketch.background(153);
            sketch.line(0, 0, width, height);
        }
    }
});