### 실행

1. start development server

```
$ npm run start
```

2. start json-server

```
$ npm run server
```

3. build + serve

```
$ npm run serve
```

---

### lecture 1

- 로딩 성능 최적화
  - 이미지 사이즈 최적화
  - Code Split
  - 텍스트 압축
- 렌더링 성능 최적화
  - Bottleneck 코드 최적화

---

### 이미지 사이즈 최적화

적절한 이미지 사이즈

---

### Code Split

어떻게 해야 코드를 효율적으로 분할할 수 있는지

---

### 텍스트 압축

js, css, html등등 리소스들을 서버에서 압축해서 작은 사이즈로 다운가능 —- > 로딩 성능 최적화

---

### Bottleneck 코드 최적화

→ 렌더링 성능 최적화

느리게 렌더링 되도록 만드는 코드를 찾아내고 수정하는 방법에 대해…

---

---

### 사용할 분석 툴

![image.png](<./readme-img/image%20(15).png>)

---

### Audits 툴을 이용한 페이지 검사

- Opportunites
  - 리소스 관점에서 가이드 (로딩 성능 최적화)
- Diagnostics
  - 페이지 실행 관점에서 가이드 (렌더링 성능 최적화)

---

### 이미지 사이즈 최적화

필요한 사이즈의 2배정도가 적당함 (120x120 → 240x240)

**→ 클라우드날, 이미직스 같은 이미지 CDN을 활용**

### CDN (Contents Delivery Network)

물리적 거리의 한계를 극복하기 위해 소비자(사용자)와 가까운 곳에 컨텐츠 서버를 두는 기술

### Image CDN (Image processing CDN)

이미지에 전처리 과정을 거쳐서 사용자에게 전달

![image.png](<./readme-img/image%20(4).png>)

```java
/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
function getParametersForUnsplash({width, height, quality, format}) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`
}

<img src={props.image + getParametersForUnsplash({
		width: 1200, height: 1200, quality: 80, format: 'jpg'})}
		alt="thumbnail" />
```

---

### Bottleneck 코드 탐색

느린 자바스크립트 코드를 어떻게 하면 최적화할 수 있는지

- **minify javascript**

![image.png](<./readme-img/image%20(5).png>)

    → 코드 중에 공백/주석 등을 제거함으로써 JS 파일을 줄임

즉, **공백, 줄바꿈, 주석, 불필요한 변수명** 등을 없애서

파일 크기를 작게 만들어 네트워크 전송 속도를 높이는 거

CRA나 Next의 경우엔 프로덕션 빌드를 하면 알아서 minify를 해줌

(CRA는 Create React App임)

![image.png](<./readme-img/image%20(6).png>)

- pre-connect to require the origins

→ 우리가 사용할 리소스의 주소를 프리커넥트하고 DNS를 프리패치 해라

— - -

- minify-mainthreadwork
  메인스레드의 작업을 줄여라 ?
- Serve static assets with an efficient cache policy
  해당 항목들에 캐시가 걸려 있지 않다 ?
- Reduce JavaScript execution time
  JS 실행시간을 줄여라 ?
  얼마만큼 소요했는지만 보여줌 → **Performance 탭 사용**

---

### bottleneck 코드 최적화

article 파일에 removeSpecialCharacter 함수가 특수문자들을 없애기 위해 이중중첨 for문을 돌고 있음.

⇒ replace 사용하면 더 괜찮게 수정가능

⇒ remove-markdown 라이브러리 사용

![image.png](<./readme-img/image%20(7).png>)

작업양 줄이기 → 여기서 실제로 보여주는 양은 200자정도… 넉넉하게 300자정도로 검사

```java
let _str = str
_str.replace("#",'') // 맨 처음만 바뀜 -> 정규식 사용

// 정규식
let _str = str
_str.replace(/\#/g,'') // ""대신 //로 감싸는것은 정규식을 의미.
											 // g는 만족하는 모든 패턴을 찾아서 변경하겠다~
											 // 정규식에 특수문자가 들어감으로 #앞에 \
// 다른 특수문자들에도 적용
let _str = str
_str = _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\n\=\-]/g,'')

// 넉넉하게 300자정도만 자름
let _str = str.substring(0,300)
_str = _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\n\=\-]/g,'')
```

---

### bundle 파일 분석

bundle파일을 분석하고 적절하게 코드를 분할하는 법….

bundle analyzer라는 webpack 툴 사용할 거임.

→ 직접플러그인을 넣는 방식은 Create React App을 이젝트하거나 웹팩 컨피그를 커스텀할수있는 라이브러리를 깔아야함.

→ CRA Bundle Analyzer라는 툴이 나왔음. 그거사용

![image.png](<./readme-img/image%20(8).png>)

![image.png](<./readme-img/image%20(9).png>)

![image.png](<./readme-img/image%20(10).png>)

---

### Code Splitting ?

코드를 분할하는 것

코드스플리팅은 여러 패턴이 있음

- 페이지별로
- 모듈별로

![image.png](<./readme-img/image%20(11).png>)

- 두가지를 혼용하는 방식
- 다른방식들도 존재

→ 불필요한 코드 또는 중복되는 코드가 없이 적절한 사이즈의 코드가 적절한 타이밍에 로드될 수 있도록 하는 것

---

react 공식문서 - 코드분할 참고

- Route-based code splitting
  페이지별로 어떻게 코드스플리팅 가능한지 …
  → Suspense, lazy 사용..
  ![image.png](<./readme-img/image%20(12).png>)

code splitting은 webpack이 주체함… → 별도 설정 필요

cra 방식으로 만들어진 플젝은 별도의 설정이 필요없음!!!

---

### 텍스트 압축 적용

웹페이지를 로드할 때에는 그에 필요한 다양한 리소스들도 같이 옴.

html, js, css 같은 텍스트들로 이루어진 리소스들.,, 사이즈가 크면 역시 로딩이 느려짐

→ 문서의 사이즈를 줄이기 위해선, codeSplitting도 하나의 방법이었고. 텍스트압축도 방법임

텍스트압축은 말그대로 파일을 압축하듯이 서버에서 보내는 리소스를 압축해서 서비스.. → 다운로드하는 리소스 크기를 줄임

텍스트 압축은 GZIP, Deflate 두가지 방식을 사용

- GZIP
  - 블럭화, 휴리스틱 필터링, 헤더와 체크섬과 함께 내부적으로 deflate를 사용하는 파일 포멧
- Deflate
  - LZ77이라는 알고리즘과 허프망코딩을 사용해서 데이터를 감쌈

GZIP이 더 좋은 압축률을 가짐!!

압축이 안되어있던 번들 파일들에 적용해줌

→ serve.js 확인필요,..

![image.png](<./readme-img/image%20(13).png>)

```java
node ./node_modules/serve/bin/serve.js -help
```

뒤에 붙은 알파벳이 뭔지 나옴

-u가 압축을 막음. 제거하면 정상적으로 텍스트압축 기능이 실행됨

![image.png](<./readme-img/image%20(14).png>)

Content-Encoding: gzip이라고 뜬 것을 확인할 수 있음

### → 몇몇개는 encoding이 없음!! 왜 ??

파일을 무분별하게 압축을 해서 전달하려고 하면 오히려 성능이 떨어짐.

### ⇒ 어떤파일을 인코딩하는게 좋은가?

파일의 크기가 2KB이상이 되면 인코딩하여 전달하는 것이 좋음 ! ! !

---
