# FirstPitch Frontend

야구 사전 프론트엔드 애플리케이션입니다.

## 환경 설정

### 1. 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# 개발 환경
NEXT_PUBLIC_API_URL=http://localhost:3001

# 프로덕션 환경 (예시)
# NEXT_PUBLIC_API_URL=https://api.firstpitch.com
```

### 2. 환경변수 설명

- `NEXT_PUBLIC_API_URL`: 백엔드 API 서버의 기본 URL
  - 개발: `http://localhost:3001`
  - 프로덕션: 실제 배포된 API 서버 URL

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm run start
```

## 기술 스택

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Authentication**: JWT + HTTP-only Cookies
- **UI Components**: Custom Components + Tailwind

## 주요 기능

- 사용자 인증 (회원가입/로그인)
- 야구 사전
- 야구 퀴즈
- 야구장 정보
- 튜토리얼
- 사용자 프로필 관리

## 개발 가이드

### API 호출
- `src/lib/api/` 디렉토리에 API 함수들이 정의되어 있습니다
- `src/lib/utils/constants.ts`에 API 엔드포인트가 정의되어 있습니다

### 상태 관리
- Redux Toolkit을 사용하여 전역 상태를 관리합니다
- `src/lib/redux/` 디렉토리에 스토어와 슬라이스가 정의되어 있습니다

### 스타일링
- Tailwind CSS를 사용하여 반응형 디자인을 구현합니다
- `src/app/globals.css`에 커스텀 색상 팔레트가 정의되어 있습니다
