import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { experience, photoCount, placeName } = body;

        if (!experience) {
            return NextResponse.json(
                { error: 'Experience data is required' },
                { status: 400 }
            );
        }

        const prompt = `
당신은 네이버 블로그 마케팅 전문가이자, 감성적인 에세이 작가입니다.
사용자가 제공한 "경험 조각"들을 바탕으로, 협찬을 유도할 수 있는 고품질의 맛집 리뷰 포스팅을 작성해주세요.

[입력 데이터]
- 장소명: ${placeName}
- 첫인상: ${experience.firstImpression.join(', ')}
- 맛 평점: ${experience.tasteRating}/5
- 가성비 평점: ${experience.valueRating}/100 (높을수록 좋음)
- 장점: ${experience.pros.join(', ')}
- 아쉬운 점: ${experience.cons.join(', ')}
- 한줄평: "${experience.oneLiner}"
- 사진 개수: ${photoCount}장

[작성 가이드라인 - D-I-A 로직]
1. **Experience (경험)**: 제공된 데이터를 단순 나열하지 말고, 실제 겪은 에피소드처럼 자연스럽게 녹여내세요.
   - 예: "직원이 친절함" -> "바쁜 점심시간이었는데도, 물잔이 비자마자 채워주시는 세심함에 감동했어요."
2. **Reliability (신뢰성)**:
   - "아쉬운 점"을 솔직하게 언급하되, "그래도 방문할 가치가 있다"는 식으로 부드럽게 마무리하세요.
   - 내돈내산 느낌을 강조하세요.
3. **Structure (구조)**:
   - **제목**: 클릭을 부르는 제목 3개 제안.
   - **도입부**: 방문 동기, 첫인상, 위치 정보.
   - **본문**: 메뉴/맛(구체적 묘사), 분위기, 서비스.
   - **마무리**: 총평, 재방문 의사.
4. **Tone & Manner**:
   - 2030 여성 타겟, 감성적이고 정보는 정확하게.
   - 이모지 적절 사용 (✨, 🍽️).
   - 문단은 짧게.

[출력 형식]
마크다운 형식이지만 네이버 블로그에 붙여넣기 좋은 텍스트.
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "당신은 네이버 블로그 상위 노출 로직(D-I-A)을 마스터한 전문 AI 에디터입니다."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2500,
        });

        const content = completion.choices[0]?.message?.content || "글 생성에 실패했습니다.";

        return NextResponse.json({ content });

    } catch (error: any) {
        console.error('Error generating content:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
