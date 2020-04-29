## Article Collector

URL 삭제시(혹은 수정시) 데이터 파일이 삭제되지 않는 문제가 있습니다.
이 문제를 해결하려면 fs module의 fs.unlink를 이용해 삭제해야 데이터 파일의
이름이 0, 1, 2라도 다음에 추가된 URL과 겹치지 않고 사용할 수 있습니다.

혹은 모든 데이터 파일들의 이름을 다르게 설정해주어야 합니다.

데이터 파일 삭제 방법-------------------------------------------------
// include node fs module
var fs = require('fs');
// delete file named 'sample.txt'
fs.unlink('sample.txt', function (err) {
if (err) throw err;
// if no error, file has been deleted successfully
console.log('File deleted!');
});
