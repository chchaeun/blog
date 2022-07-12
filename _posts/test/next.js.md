---
title: next.js
category: test
thumbnail: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80
tags: Next.js, SSR, SSG, frontend, react
date: 2022-07-12 10:00
---

# 🐇 SSR vs SSG

Next.js는 기본적으로 모든 페이지를 pre-rendering 한다. Next.js는 모든 페이지의 HTML를 미리 생성한다.

생성된 각각의 HTML은 해당 페이지에 필요한 최소한의 자바스크립트 코드와 연결된다. 페이지가 브라우저에 의해서 로드 된 뒤, 자바스크립트 코드가 실행되고 페이지를 interactive하게 만든다. Next.js에서는 이 개념을hydration이라고 한다.

Pre-rendering에는 두가지 형태가 있다. Static Generation과 Server-side Rendering(SSR). SSR은 익숙한데 Static Generation은 뭐지?

## Static Generation

Static Generation, 즉 Static-site Generation(SSG)는 build time에 HTML을 생성한다. Next.js에서는 `next build` 명령을 실행했을 때 페이지를 생성한다. 해당 페이지로 요청이 올 경우 이미 생성된 HTML을 반환한다. CDN에 캐싱하여 페이지를 빠르게 응답할 수 있다.

마케팅 페이지, 블로그 포스트 또는 포트폴리오, E-commerce의 제품 리스트, 도움 및 문서 페이지처럼 데이터의 실시간 변화가 적은 페이지를 SSG로 구성하면 빠른 응답이 가능하다.

## Server-side Rendering

SSR은 페이지에 대한 요청이 있을 때 HTML을 생성한다. 따라서 실시간으로 데이터가 업데이트 되거나, 요청이 들어올 때마다 내용이 변경되는 페이지에 적합하다. 다만 SSG에 비해 속도가 느리기 때문에 반드시 필요할 때만 사용해야 한다.

# 🐇 Next.js에서 SSG 적용

Next.js와 React Query를 사용하여 간단하게 SSG를 구현해보자. 다음의 제품 리스트는 실시간으로 변화하는 데이터가 아니기 때문에 SSG로 pre-rendering하는 것이 적합하다.

![](https://velog.velcdn.com/images/chchaeun/post/f081494e-ffac-4f85-858c-a6fc5a7edce0/image.png)

기존의 화면에서 페이지 소스를 봤을 때, 찜한 상품, 장바구니 등의 코드는 있지만 제품 데이터에 관한 내용은 HTML에 포함되지 않았다. 따라서 현재 페이지가 요청됐을 때 자바스크립트를 통해 데이터를 불러오는 것을 알 수 있다.

![](https://velog.velcdn.com/images/chchaeun/post/b0b25e17-9db8-4354-8dcc-b62f049fc5c1/image.png)

## getStaticProps

`getStaticProps` 라는 `async` 함수를 `export` 하면 build time에 호출된다. 이 함수는 `List` 컴포넌트에서 사용될 데이터를 fetch하고 해당 페이지를 pre-rendering할 수 있도록 데이터를 넘겨준다. return 값에서 넘겨준 props가 List의 인자로 넘어간다.

`useInfiniteQuery` 와 함께 이 함수를 사용하려면 props의 형태를 쿼리의 데이터 반환 형태와 맞춰주어야 한다. 따라서 첫번째 페이지의 데이터를 담은 pages 배열과 pageParams를 넘겨주었다.

```tsx
const List = (props) => {
  // Render product lists...
};
export async function getStaticProps() {
  const data = await fetchPhotos(1);
  const pages = [data];
  return {
    props: {
      pages,
      pageParams: 1,
    },
  };
}
```

형태에 맞게 interface를 작성해주었다.

```tsx
interface IPage {
  data: IPhoto[];
  nextPage: number;
}
interface IProps {
  pageParams: number[];
  pages: IPage[];
}

const List = (props: IProps) => {
  console.log(props);
};
```

끝으로 `useInfiniteQuery`의 option으로 initialData에 props를 넣으면 초기 데이터로 props가 들어가게 된다.

```tsx
const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
  useInfiniteQuery(
    ["photos"],
    async ({ pageParam = 1 }) => {
      return await fetchPhotos(pageParam);
    },
    {
      initialData: props,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    }
  );
```

이렇게 해준 뒤 페이지 소스를 보면 처음 불러오는 페이지 데이터가 HTML에 들어간 것을 볼 수 있다.

![](https://velog.velcdn.com/images/chchaeun/post/a2711916-bb84-4359-b760-e575c33cea7a/image.png)

### Build

`npm run build` 를 실행하고 생성된 HTML 파일을 확인해보자. 데이터가 들어간 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/chchaeun/post/94dd40fd-7a63-461f-8f3a-745eac5b189e/image.png)

개발할 때는 서버 상태가 변경됐을 때 바로 페이지에 반영이 되지만, 배포된 뒤에는 빌드 후 재배포하지 않는 이상 이 데이터는 변경되지 않는다.

### Incremental Static Generation(ISR)

만약 배포를 하지 않고도 서버 상태가 갱신됐을 때 반영이 되도록 하고 싶으면 어떻게 해야 할까? 예를 들어 한 시간에 한 번 제품 리스트가 서버에서 변경되는데, 그 때마다 빌드&배포를 하는 것이 번거로울 수 있다.

ISR 방식은 일정한 주기를 설정하면 해당 주기에 따라 페이지를 재생성하는 것이다. `getStaticProps` 함수의 return값으로 revalidate 값을 추가한다. 다음 코드는 10초 단위로 페이지를 재생성하겠다는 의미이다.

```tsx
export async function getStaticProps() {
  console.log("Re-generating...");

  const data = await fetchPhotos(1);
  const pages = [data];

  return {
    props: {
      pages,
      pageParams: 1,
    },
    revalidate: 10,
  };
}
```

이렇게 설정하고 `npm run build` 를 실행하면 터미널에 다음과 같이 나타난다.

![](https://velog.velcdn.com/images/chchaeun/post/cc2412b2-9376-4b05-94de-e313e057be73/image.png)

`npm start` 를 하면 개발 환경이 아닌 배포 환경에서 프로그램이 어떻게 동작하는지 확인할 수 있다.

처음 localhost:3000을 열었을 때 Re-generating이 콘솔에 찍힌다. 그 뒤에 바로 새로고침하면 아무런 변화가 일어나지 않지만 10초가 경과된 후 다시 페이지를 새로고침하면 Re-generating이 찍힌다. 설정해둔 주기를 기준으로 새로고침했을 때 페이지를 재생성할 것인지의 여부가 결정되는 것이다.

![](https://velog.velcdn.com/images/chchaeun/post/9fe3a14c-d948-4c31-a5f6-85198f47fe9d/image.png)

## getStaticPaths

다이나믹 라우팅에서 SSG 방식을 적용하려면 어떻게 해야 할까? SSG 방식은 build time에 페이지를 생성하기 때문에 이 방식을 사용하려면 해당 페이지에 각각의 라우트로 접근했을 때 필요한 정보를 미리 가지고 있어야 한다.

라우트가 `/id` 인 제품의 상세페이지에 대해 SSG 방식을 적용해볼 것이다.

![](https://velog.velcdn.com/images/chchaeun/post/f4722420-ff4d-4dda-9555-c6c1ecbd903d/image.png)

`getStaticProps` 를 사용해서 다음과 같이 아이디를 통해 제품의 상세 정보 데이터를 가져올 수 있다.

```tsx
interface IParams {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const data = await fetchPhotoById(params.id);
  return { props: data };
}
```

이렇게 실행해보면 다음과 같은 에러가 뜨는 것을 볼 수 있다. `getStaticPaths` 가 필요하다고 한다.

![](https://velog.velcdn.com/images/chchaeun/post/f463c688-6505-4122-96bf-7981b797e70a/image.png)

예를 들어 아이디가 ‘p1’인 제품의 상세페이지를 얻고 싶을 때 SSG 방식을 사용하려면 build time에 이미 p1에 대한 상세페이지가 생성되어 있어야 한다. 어떤 정적페이지를 생성할지 미리 결정하도록 하는 것이 `getStaticPaths` 이다.

paths 배열에 params 값들을 넣어 리턴해주면 되는데, 예를 들어 아이디가 p1, p2, p3인 제품의 상세 페이지를 미리 생성하고 싶을 때 다음과 같이 작성하면 된다.

```tsx
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "p1" } },
      { params: { id: "p2" } },
      { params: { id: "p3" } },
    ],
  };
}
```

### fallback

미리 등록되지 않은 라우트에 접근하려고 했을 때 어떻게 처리할 것인지 정하는 옵션이다. `true` , `false` 혹은 `blocking` 셋 중에 선택할 수 있다.

```tsx
export async function getStaticPaths() {
  return {
    paths:[...],
		fallback: boolean | 'blocking'
  };
}
```

fallback이 `false` 이면 미리 등록되지 않은 페이지에 접근했을 때 404 page가 나타나고, `true` 이면 나타나지 않고 동적으로 처리한다. 만약 쇼핑몰과 같이 데이터가 매우 많아서 각각에 대한 모든 페이지를 pre-generating하기 힘들 때, fallback `true` 를 이용하면 자주 접근되는 첫 페이지만 build time에 생성할 수 있다. fallback이 `'blocking'` 일 땐

- `false`
  - 미리 등록되지 않은 페이지에 접근했을 때 404 page가 나타난다.
- `true`

  - fallback 페이지를 띄우고, 서버에서 페이지를 생성한 뒤 사용자에게 보여준다.
  - 다음에 같은 접근이 있을 때는 정적 페이지를 보여준다.
  - `useRouter` 를 통해 fallback 페이지를 설정할 수 있다.

  ```tsx
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  ```

- `'blocking'`
  - 서버 사이드 렌더링한 정적 페이지를 보여준다.
  - 해당 path를 등록해두었다가 다음에 같은 접근이 있을 때 정적 페이지를 보여준다.
