var resolveAssetSource = require('resolveAssetSource');



// export default {
//
//   categories:[
//     {'4-Exhibitions':resolveAssetSource(require('../assets/images/categories/exhibitions.jpg'))},
//     {'5-Film Club':resolveAssetSource(require('../assets/images/categories/film-club.jpg'))},
//     {'20-Live Music':resolveAssetSource(require('../assets/images/categories/live-music.jpg'))},
//     {'3-Mind & Body':resolveAssetSource(require('../assets/images/categories/mind-body.jpg'))},
//     {'6-Nights Out':resolveAssetSource(require('../assets/images/categories/nights-out.jpg'))}
//   ]
// }


export default {

  categories:[
    [{'Exhibitions':resolveAssetSource(require('../assets/images/categories/exhibitions.jpg'))},{'id':4}],
    [{'Film Club':resolveAssetSource(require('../assets/images/categories/film-club.jpg'))},{'id':5}],
    [{'Live Music':resolveAssetSource(require('../assets/images/categories/live-music.jpg'))},{'id':20}],
    [{'Mind & Body':resolveAssetSource(require('../assets/images/categories/mind-body.jpg'))},{'id':3}],
    [{'Nights Out':resolveAssetSource(require('../assets/images/categories/nights-out.jpg'))},{'id':6}]
  ]
}

