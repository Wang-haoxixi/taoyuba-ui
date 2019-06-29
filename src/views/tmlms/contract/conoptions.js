
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'           
import JsPDF from 'jspdf'
import request from '@/router/axios'
const  bucketName  = 'files-'

 export  function getMyPdf (contractId,dom){      
    var title = 'myContract.pdf'
    console.log('zzzzzz')    
    var contract = {
      contractId: contractId,
      fileUrl:'',
    }        
    html2Canvas(dom, {                                     
      allowTaint:  true,
    }).then( function (canvas) {              
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {      
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {                                                                                                                             
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {         
            PDF.addPage()
          }
        }
      }           
    var  buffer  =   PDF.output('datauristring')                                                          
     var  myfile  =  dataURLtoFile(buffer,title)        
     var formdata  =  new  FormData()                                                                                    
     formdata.append('file',myfile)                                                                                       
      uploadFile(formdata).then(({data}) => {           
        if(data.code === 0){
            contract.fileUrl  = bucketName + data.data.fileName
               addContractFile(contract).then(({data}) => {
              if(data.code === 0){
                downloadFile(contract.fileUrl)
              }
           })
      }
     })             
    }
    )
  }
 

function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while(n--){
      u8arr[n] = bstr.charCodeAt(n)
  }       
  //转换成file对象
  return new File([u8arr], filename, {type:mime})
}


 function  uploadFile (data) { 
  return  request({
        url: '/admin/file/upload',
        method:'post',
        data,
  })
}

function  addContractFile (data) {
  return  request({
        url:'/tmlms/labor_contract/addfile',      
        method:'post',
        data,
  })
}


export  function  downLoadpdf (fileName) {
  return  request({
    url:`/admin/file/${fileName}`,      
    method:'get',
})
}


export function downloadFile (fileUrl) {
  request({
    url: '/admin/file/' +fileUrl,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    let ArrayName = fileUrl.split('-')
    let  fileName = ArrayName[1]
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
  })
}


