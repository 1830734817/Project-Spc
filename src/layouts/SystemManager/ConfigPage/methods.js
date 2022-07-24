import { message } from "antd";

/**
 * @author zyn
 * @description 校验上传的图片文件的宽高
 * @param {File} file -- 上传图片文件 
 * @param {Number} w -- 宽度
 * @param {Number} h -- 高度
 */
export function testImgWidthHeight(file, w, h,) {
  const reader = new FileReader();
  let result = false;
  reader.readAsDataURL(file);
  reader.onload = () => {
    let data = reader.result;
    let img = new Image()
    img.src = data
    img.onload = () => {
      if(img.width > w || img.height > h){
        result = false
        message.warn('上传图片格式不得大于：' + w +'x'+h)
      }else{
        result = true
      }
    };
  }
  return result
	// var input = document.getElementsByName('img');
	// if (input.files) {
	// 	//读取图片数据
	// 	var f = input.files[0];
	// 	var reader = new FileReader();
	// 	reader.onload = function(e) {
	// 		var data = e.target.result;
	// 		//加载图片获取图片真实宽度和高度
	// 		var image = new Image();
	// 		image.onload = function() {
	// 			var width = image.width;
	// 			var height = image.height;
	// 			if (width != w || height != h) {
	// 				//隐藏
	// 				input.value = '';
	// 				callback && callback(false);
	// 			} else {
	// 				callback && callback(true);
	// 			}
	// 		};
	// 		image.src = data;
	// 	};
	// 	reader.readAsDataURL(f);
	// } else {
	// 	var image = new Image();
	// 	image.onload = function() {
	// 		var width = image.width;
	// 		var height = image.height;
	// 		var fileSize = image.fileSize;
	// 		alert(width + '===2===' + height + '=====' + fileSize);
	// 	};
	// 	image.src = input.value;
}
/**
 *文件大小
 * @param fileData
 * @param Max_Size 限制圖片大小
 * @returns {boolean}
 */
export function testMaxSize(fileData, Max_Size) {
	var isAllow = false;
	var size = fileData.files[0].size;
	isAllow = size <= Max_Size;
	if (!isAllow) {
		return false;
	}
	return isAllow;
}
/**
 * 判断图片类型
 * @param eventId 圖片id
 * @param gif|jpg|jpeg|png|GIF|JPG|PNG
 * @returns {boolean}
 */
function testImgType(eventId) {
	var tmpFile = document.getElementById(eventId);
	if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(tmpFile.value)) {
		tmpFile.value = ''; //清空上傳圖片
		return false;
	}
	return true;
}
