# Blog Helper v0.1 MVP

> **"나답게 쓰다 보니 협찬이 따라오는"** 블로그 시작 도우미

블로그 완전 초보를 위한 AI 글쓰기 도구입니다. 사진을 올리고 간단한 키워드만 선택하면, 네이버 블로그 D-I-A 로직에 최적화된 글을 자동으로 생성해줍니다.

## 🚀 Key Features via v0.1

- **📸 사진 업로드**: 최대 10장의 사진을 드래그 앤 드롭으로 업로드
- **👆 경험 선택 UI**: 텍스트 입력 없이 버튼과 슬라이더로 쉽게 리뷰 작성
- **✨ AI 글 생성**: GPT-4o가 경험을 바탕으로 자연스러운 에세이 작성
- **📋 원클릭 복사**: 생성된 글을 네이버 블로그에 바로 붙여넣기

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Custom Green Theme)
- **AI**: OpenAI GPT-4o API

## 🏃‍♂️ Getting Started

### 1. 환경 설정

`.env.local` 파일에 OpenAI API 키가 설정되어 있어야 합니다.

```bash
OPENAI_API_KEY=sk-...
```

### 2. 실행

```bash
# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 Usage Guide

1. **사진 선택**: 블로그에 올릴 사진 1~10장을 선택합니다.
2. **경험 입력**:
   - 식당/장소의 첫인상을 선택하세요.
   - 맛과 가성비를 솔직하게 평가해주세요.
   - 좋았던 점과 아쉬운 점을 체크하세요.
3. **글 생성**: '블로그 글 생성하기' 버튼을 누르고 약 10초간 기다립니다.
4. **복사 & 발행**: 완성된 글을 복사하여 네이버 블로그 앱에 붙여넣고, 사진을 순서대로 배치하여 발행하세요.

---

**Made with ❤️ by Blog Helper Team**
