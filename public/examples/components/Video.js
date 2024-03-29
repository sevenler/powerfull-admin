define('examples/components/Video.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      $schema: "https://houtai.baidu.com/v2/schemas/page.json#",
      title: "视频播放器",
      body: [
          '<p class="text-danger">另外还支持直播流， flv 和 hls 格式</p>',
          {
              type: "video",
              autoPlay: false,
              rates: [1.0, 1.5, 2.0],
              src: "https://amis.bj.bcebos.com/amis/2019-12/1577157317579/trailer_hd.mp4",
              poster: "https://internal-amis-res.cdn.bcebos.com/images/2019-12/1577157239810/da6376bf988c.png"
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Video.js.map
  

});
