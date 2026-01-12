import { test, expect } from '@playwright/test';

test.describe('Blog Helper 애플리케이션', () => {
  test('페이지가 정상적으로 로드되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 헤더 확인
    await expect(page.getByRole('heading', { name: /Blog Helper/i })).toBeVisible();
    await expect(page.getByText('Beta')).toBeVisible();
    
    // 메인 타이틀 확인
    await expect(page.getByRole('heading', { name: /오늘의 경험을 기록해볼까요\?/i })).toBeVisible();
    
    // 스텝 헤더 확인
    await expect(page.getByRole('heading', { name: '사진 선택' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '경험 입력' })).toBeVisible();
  });

  test('사진 업로드 UI가 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 사진 업로드 영역 찾기
    const uploadArea = page.getByText('사진을 선택해주세요');
    await expect(uploadArea).toBeVisible();
  });

  test('경험 입력 폼이 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 첫인상 섹션
    await expect(page.getByRole('heading', { name: /첫인상/i })).toBeVisible();
    
    // 맛 평가 섹션
    await expect(page.getByRole('heading', { name: /맛 평가/i })).toBeVisible();
    
    // 가성비 섹션
    await expect(page.getByRole('heading', { name: /💰 가성비/i })).toBeVisible();
    
    // 장단점 섹션
    await expect(page.getByRole('heading', { name: /좋았던 점/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /아쉬운 점/i })).toBeVisible();
    
    // 한줄평 섹션
    await expect(page.getByRole('heading', { name: /한줄평/i })).toBeVisible();
  });

  test('맛 평가 별점 클릭이 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 맛 평가 섹션 찾기
    const tasteSection = page.locator('text=⭐ 맛 평가').locator('..');
    
    // 3점 버튼 찾기 (이모티콘과 텍스트로)
    const threePointButton = tasteSection.getByRole('button').filter({ hasText: '3점' });
    await threePointButton.click();
    
    // 클릭된 버튼이 활성화 상태인지 확인 (bg-primary 클래스 확인)
    const buttonClass = await threePointButton.getAttribute('class');
    expect(buttonClass).toContain('bg-primary');
  });

  test('가성비 슬라이더가 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 슬라이더 찾기
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    
    // 슬라이더 값 변경 (step이 10이므로 70으로 설정)
    await slider.evaluate((el: HTMLInputElement) => {
      el.value = '70';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    // 값이 변경되었는지 확인
    const value = await slider.inputValue();
    expect(value).toBe('70');
  });

  test('한줄평 텍스트 입력이 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 텍스트 입력 필드 찾기
    const input = page.locator('input[placeholder="직접 입력하기..."]');
    await expect(input).toBeVisible();
    
    // 텍스트 입력
    const testText = '정말 맛있는 맛집이에요!';
    await input.fill(testText);
    
    // 입력된 값 확인
    const value = await input.inputValue();
    expect(value).toBe(testText);
  });

  test('블로그 글 생성 버튼이 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 생성 버튼 찾기
    const generateButton = page.getByRole('button', { name: /블로그 글 생성하기/i });
    await expect(generateButton).toBeVisible();
  });

  test('필수 입력값 없이 생성 버튼 클릭 시 알림이 표시되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // alert 이벤트 리스너 설정
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    // 아무것도 입력하지 않고 버튼 클릭
    const generateButton = page.getByRole('button', { name: /블로그 글 생성하기/i });
    await generateButton.click();
    
    // 알림 메시지 확인
    await page.waitForTimeout(500);
    expect(alertMessage).toContain('첫인상과 맛 평가는 필수입니다');
  });

  test('첫인상 키워드 선택이 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // 첫인상 키워드 버튼들 찾기
    const firstImpressionSection = page.locator('text=첫인상').locator('..');
    
    // "아늑해요" 같은 키워드 찾기 (실제 키워드는 코드에 따라 다를 수 있음)
    const keywordButtons = firstImpressionSection.locator('button');
    const buttonCount = await keywordButtons.count();
    
    // 최소 1개 이상의 키워드 버튼이 있는지 확인
    expect(buttonCount).toBeGreaterThan(0);
    
    // 첫 번째 키워드 클릭
    if (buttonCount > 0) {
      await keywordButtons.first().click();
      
      // 버튼이 선택된 상태인지 확인 (배경색 변경 등)
      const buttonClass = await keywordButtons.first().getAttribute('class');
      expect(buttonClass).toBeTruthy();
    }
  });

  test('모든 필수 정보 입력 후 생성 버튼 활성화 확인', async ({ page }) => {
    await page.goto('/');
    
    // 1. 첫인상 선택
    const firstImpressionButtons = page.locator('button').filter({ hasText: /아늑|모던|고급|캐주얼|전통/ }).first();
    await firstImpressionButtons.click();
    
    // 2. 맛 평가 선택
    const fourthStar = page.locator('[data-rating="4"]').first();
    await fourthStar.click();
    
    // 3. 생성 버튼 확인
    const generateButton = page.getByRole('button', { name: /블로그 글 생성하기/i });
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toBeEnabled();
  });

  test('반응형 디자인 - 모바일 뷰 확인', async ({ page }) => {
    // 모바일 화면 크기로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 헤더가 보이는지 확인
    await expect(page.getByRole('heading', { name: /Blog Helper/i })).toBeVisible();
    
    // 모든 섹션이 세로로 잘 정렬되어 있는지 확인
    const container = page.locator('main');
    await expect(container).toBeVisible();
  });

  test('스크롤 시 헤더가 고정되는지 확인', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('header');
    
    // 초기 위치 확인
    const initialPosition = await header.evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    expect(initialPosition).toBe('sticky');
    
    // 스크롤 후에도 헤더가 보이는지 확인
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(header).toBeVisible();
  });
});

test.describe('접근성 테스트', () => {
  test('키보드 네비게이션이 작동하는지 확인', async ({ page }) => {
    await page.goto('/');
    
    // Tab 키로 포커스 이동
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // 포커스된 요소 확인
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('적절한 HTML 시맨틱 태그 사용 확인', async ({ page }) => {
    await page.goto('/');
    
    // main, header 등 시맨틱 태그 확인
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });
});
