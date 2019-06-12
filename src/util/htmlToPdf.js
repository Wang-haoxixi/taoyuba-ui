
// // 导出页面为PDF格式
// import html2Canvas from 'html2canvas'           
// import JsPDF from 'jspdf'
// import request from '@/router/axios'

// export default{                                 
//   install (Vue) {
//     Vue.prototype.getPdf = function () {
//       var title = this.htmlTitle
//       console.log('123')
//       html2Canvas(document.querySelector('#pdfDom'), {
//         allowTaint:  true,
//       }).then(function (canvas) {
//         let contentWidth = canvas.width
//         let contentHeight = canvas.height
//         let pageHeight = contentWidth / 592.28 * 841.89
//         let leftHeight = contentHeight
//         let position = 0
//         let imgWidth = 595.28
//         let imgHeight = 592.28 / contentWidth * contentHeight
//         let pageData = canvas.toDataURL('image/jpeg', 1.0)
//         let PDF = new JsPDF('', 'pt', 'a4')
//         if (leftHeight < pageHeight) {
//           PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//         } else {
//           while (leftHeight > 0) {                                
//             PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//             leftHeight -= pageHeight
//             position -= 841.89
//             if (leftHeight > 0) {
//               PDF.addPage()
//             }
//           }
//         }     
//       var  buffer  =   PDF.output('datauristring')      
//        var  myfile  =  dataURLtoFile(buffer,title) 
//       var   formdata  = new  FormData()                         
//        formdata.append('file',myfile)     
//        uploadFile(formdata).then(({data}) => {
//               if(data.code === 0){              
//                     console.log(data.data.fileName)
//                     return  data.data.fileName
//                     //this.$message.success('上传成功!')
//               }
//        },(error) => { 
//         console.log(error.message)      
//           //this.$message.error(error.message)
//        })
//         //PDF.save(title + '.pdf')
//       }
//       )
//     }
//   },
// }

// function dataURLtoFile (dataurl, filename) {
//   var arr = dataurl.split(',')
//   var mime = arr[0].match(/:(.*?);/)[1]
//   var bstr = atob(arr[1])
//   var n = bstr.length
//   var u8arr = new Uint8Array(n)
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n)
//   }
//   //转换成file对象
//   return new File([u8arr], filename, {type:mime})
// }


// function  uploadFile (data) { 
//   return  request({
//         url: '/admin/file/upload',
//         method:'post',
//         data,
//   })
// }