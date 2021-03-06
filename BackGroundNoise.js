  var Grain = function () {
            function Grain(el) {
                /*
                 Options
                */
                this.patternSize = 100;
                this.patternAlpha = 8; // 0 <= x <= 255,
                var seed = 16758672;

                this.canvas = el
                this.ctx = this.canvas.getContext('2d');

                this.patternCanvas = document.createElement('canvas');
                this.patternCanvas.width = this.patternSize;
                this.patternCanvas.height = this.patternSize;
                this.patternCtx = this.patternCanvas.getContext('2d');
                this.patternData = this.patternCtx.createImageData(this.patternSize, this.patternSize);
                this.patternPixelDataLength = this.patternSize * this.patternSize * 4; // rgba = 4
                this.resize = this.resize.bind(this);

                window.addEventListener('resize', this.resize);

                var patternPixelDataLength = this.patternPixelDataLength;
                var patternData = this.patternData;
                var patternAlpha = this.patternAlpha;
                var patternCtx = this.patternCtx;

                // put a random shade of gray into every pixel of the pattern
                for (var i = 0; i < patternPixelDataLength; i += 4) {
                    const r = ((21 * seed + 10) % 99) / 88;
                    seed = seed + r * 19;
                    const value = r * 255;
                    patternData.data[i] = value;
                    patternData.data[i + 1] = value;
                    patternData.data[i + 2] = value;
                    patternData.data[i + 3] = patternAlpha;
                }

                patternCtx.putImageData(patternData, 0, 0);
                this.resize();

            }
            Grain.prototype.resize = function resize() {
                this.canvas.width = window.innerWidth * devicePixelRatio;
                this.canvas.height = window.innerHeight * devicePixelRatio;
                this.draw();
            };
            Grain.prototype.draw = function draw() {
                var ctx = this.ctx;
                var patternCanvas = this.patternCanvas;
                var canvas = this.canvas;
                var width = canvas.width;
                var height = canvas.height;
                // clear canvas
                ctx.clearRect(0, 0, width, height);
                // fill the canvas using the pattern
                ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
                ctx.fillRect(0, 0, width, height);
            };
            return Grain;
        }();

        var el = document.getElementById('BackNoise');
        var grain = new Grain(el);