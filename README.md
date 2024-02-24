> npm init => 프로젝트 생성
```
main 삭제 , 이러남
scripts 추가
```
> parcel
```ecmascript 6
sass를 자동으로 compile 해줌 편리함...
web server 실행도 해줌 좋음

parcel 설치
npm i parcel@next -D;
or npm i parcel

sass 설치
npm i node-sass;
```
> 폴리필하고,자동으로 import
```ecmascript 6
npm i core-js regenerator-runtime
babel은 코드를 재작성해주는 트래스파일러 프로그램으로 
이를 실행하면 기존 코드가 구표준을 준수하는 코드로 변경됨

폴리필 수행: 변경된 표준을 준수할 수 있게 기존 함수의 동작 방식을 수정하거나 
새로운 구현함수 스크립트을 지칭함

원하는 js 파일에서 임포트 해서 사용
import 'core-js/stable'; // 다양한 폴리필을 제공
import 'regenerator-runtime/runtime'
```
