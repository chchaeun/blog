# 블로그 사용 설명서

## 블로그 아이콘과 이름을 적용하세요!

<img width="1408" alt="헤더 스크린샷" src="https://user-images.githubusercontent.com/85024598/178765446-0299d97d-6276-46b2-8d0c-a1c4c2eca5d3.png">

1. header.tsx를 찾으세요.

```bash
├── components
│   └── layout
│       └── header.tsx
```

2. headerData를 변경하세요.

```javascript
const headerData = {
  icon: "블로그 아이콘 PATH",
  blog_name: "블로그 이름",
};
```

## 카테고리를 생성하세요!

<img width="777" alt="카테고리 스크린샷" src="https://user-images.githubusercontent.com/85024598/178762315-3564f92e-6334-4cf0-baf2-1b6b6b58e47b.png">

1. 카테고리와 \_info.md를 생성하세요. 카테고리 디렉터리 이름은 고유한 값을 가져야 합니다.

```bash
├── _posts
│   └── [category 아이디]
│       └── _info.md
```

2. 카테고리 정보를 입력하세요.

```yaml
---
name: 카테고리 이름
thumbnail: 카테고리 썸네일
---
```

## 멋진 포스트를 작성하세요!

<img width="900" alt="포스트 스크린샷" src="https://user-images.githubusercontent.com/85024598/178760487-181adc4d-e6fa-49ce-ac34-210df16ffbf3.png">

1. 카테고리 안에 포스트를 생성하세요. 포스트 파일 이름은 고유한 값을 가져야 합니다.

```bash
├── _posts
│   └── [category 아이디]
│       └── _info.md
│       └── [포스트 아이디].md
```

2. 포스트를 작성하세요.

```yaml
---
title: 포스트 제목
category: 카테고리 아이디
thumbnail: 포스트 썸네일
tags: 태그1, 태그2 ...
date: 2022-00-00 00:00
---
포스트 내용을 마크다운으로 작성하세요.
```

## 프로필을 만드세요!

<img width="279" alt="프로필 스크린샷" src="https://user-images.githubusercontent.com/85024598/178762939-a52090fa-a701-46b3-9069-e630c63a1ed0.png">

1. profile.md를 찾으세요.

```bash
├── _blog
│   └── profile.md
```

2. 프로필을 작성하세요.

```yaml
---
name: 이름
description: 소개글
email: 이메일
github: 깃허브 아이디(@ 제외)
image: 프로필 사진
---
```

## 당신을 더 깊게 소개하세요!

<img width="1006" alt="소개 스크린샷" src="https://user-images.githubusercontent.com/85024598/178765012-41a93cb6-bf6f-44cd-b444-3bceb470bee0.png">

1. about.md를 찾으세요.

```bash
├── _blog
│   └── about.md
```

2. 마크다운으로 소개글을 작성하세요.
