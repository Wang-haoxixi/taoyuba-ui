
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'           
import JsPDF from 'jspdf'
import request from '@/router/axios'
const  pdfBaseUrl  = 'http://183.131.134.242:9000/minio/files/'
                                
export  function getPdf (contractId) {
      var title = 'myContract.pdf'
      //var  fileUrl = '' 
      var flag =  false   
      var contract = {
        contractId: contractId,
        fileUrl:'',
      }        
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint:  true,
      }).then(async  function (canvas) {                  
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
       await  uploadFile(formdata).then(({data}) => {           
          console.log(data.data.fileName)
              contract.fileUrl  = data.data.fileName               
       })             

       await   addContractFile(contract).then(({data}) => {
            if(data.code === 0){
                flag = true
            }
       })
        //PDF.save(title + '.pdf')
      }
      )
      //console.log('pdfurl' + fileUrl)
      //console.log('fileurl'+fileUrl)
      return  flag
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


export  function  uploadFile (data) { 
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

export  function openpdf (url) {
      console.log(pdfBaseUrl + url)
      window.open(pdfBaseUrl + url)        
}

const   initForm = ()=>{          
  return {
      contractId: '',
      fileUrl: '',
  }
}
export {initForm}