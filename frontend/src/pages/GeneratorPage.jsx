import React, { useState } from 'react';

// 아이콘 컴포넌트 (Lucide 아이콘 스타일의 인라인 SVG)
const CopyIcon = (props) => (
  <svg xmlns="http://www.w.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);
const SaveIcon = (props) => (
  <svg xmlns="http://www.w.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);
const RefreshCwIcon = (props) => (
    <svg xmlns="http://www.w.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
);


export default function GeneratorPage() {
  // 컴포넌트의 상태(State)를 관리합니다.
  const [templateType, setTemplateType] = useState(''); // 템플릿 유형
  const [message, setMessage] = useState(''); // 사용자가 입력한 메시지
  const [isLoading, setIsLoading] = useState(false); // AI 생성 중 로딩 상태
  const [result, setResult] = useState(null); // AI가 생성한 결과 템플릿

  // '생성하기' 버튼 클릭 시 실행될 핸들러 함수
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('메시지 내용을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    setResult(null);

    // 실제로는 여기에 API 호출 코드가 들어갑니다.
    // 지금은 2초 후에 가짜 결과를 보여주는 시뮬레이션입니다.
    setTimeout(() => {
      const generatedContent = '안녕하세요, #{고객명}님.\n주문하신 상품의 결제가 정상적으로 완료되었습니다.\n\n- 주문번호: #{주문번호}\n- 상품명: ' + message.substring(0, 10) + '...\n- 결제금액: #{결제금액}원\n\n이용해주셔서 감사합니다.';
      
      setResult({
        title: (templateType || '주문완료') + ' 안내',
        content: generatedContent,
      });
      setIsLoading(false);
    }, 2000);
  };

  // 결과 복사 핸들러
  const handleCopy = () => {
    if(result && result.content) {
        // navigator.clipboard.writeText는 보안 정책(https)에 따라 동작하지 않을 수 있습니다.
        // 좀 더 구식의 document.execCommand를 사용하여 호환성을 높입니다.
        const textArea = document.createElement('textarea');
        textArea.value = result.content;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('템플릿 내용이 복사되었습니다.');
        } catch (err) {
            alert('복사에 실패했습니다.' + err);
        }
        document.body.removeChild(textArea);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI 템플릿 생성</h1>
          <p className="text-gray-600 mt-1">원하는 내용을 입력하면, AI가 카카오 정책에 맞는 알림톡 템플릿을 만들어 드립니다.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- 입력 영역 (Input Area) --- */}
          <div className="bg-white p-6 rounded-lg shadow">
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* GEN-001-INP-001: 템플릿 유형 선택 */}
              <div>
                <label htmlFor="templateType" className="block text-sm font-medium text-gray-700">템플릿 유형 (선택)</label>
                <select
                  id="templateType"
                  value={templateType}
                  onChange={(e) => setTemplateType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">유형 선택</option>
                  <option value="예약확인">예약 확인</option>
                  <option value="주문완료">주문 완료</option>
                  <option value="배송안내">배송 안내</option>
                  <option value="이벤트공지">이벤트 공지</option>
                </select>
              </div>

              {/* GEN-001-INP-002: 메시지 내용 입력 */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">메시지 내용</label>
                <textarea
                  id="message"
                  rows="8"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="예: 홍길동 고객님, 주문하신 상품의 배송이 시작되었습니다."
                ></textarea>
                {/* GEN-001-INP-003: 변수 사용 안내 (오류 수정) */}
                <p className="mt-2 text-xs text-gray-500">
                  고객별 정보는 <code className="bg-gray-200 text-gray-800 px-1 rounded-sm font-mono text-xs">#&#123;고객명&#125;</code>과 같이 입력하면 변수로 처리돼요.
                </p>
              </div>

              {/* GEN-001-BTN-001: 생성하기 버튼 */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                  {isLoading ? '생성 중...' : '템플릿 생성하기'}
                </button>
              </div>
            </form>
          </div>

          {/* --- 결과 영역 (Output Area) --- */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">생성 결과</h2>
            <div className="bg-gray-50 rounded-md p-4 min-h-[300px] flex flex-col">
              {/* GEN-001-OUT-001: 로딩 인디케이터 */}
              {isLoading && (
                <div className="m-auto text-center">
                  <p className="text-gray-600">AI가 템플릿을 만들고 있어요...</p>
                </div>
              )}

              {/* 결과 표시 */}
              {!isLoading && result && (
                <div className="flex-grow flex flex-col">
                  {/* GEN-001-OUT-002: 생성된 템플릿 제목 */}
                  <h3 className="font-bold text-gray-900">{result.title}</h3>
                  {/* GEN-001-OUT-003: 생성된 템플릿 내용 */}
                  <textarea
                    readOnly
                    value={result.content}
                    className="mt-2 w-full flex-grow bg-transparent border-none resize-none focus:ring-0 p-0 text-sm text-gray-700"
                  ></textarea>
                  {/* GEN-001-OUT-004: 규정 준수 검토 결과 */}
                  <p className="mt-4 text-xs text-green-600">✓ 카카오 알림톡 운영정책을 준수한 템플릿입니다.</p>
                </div>
              )}

              {/* 초기 상태 메시지 */}
              {!isLoading && !result && (
                <div className="m-auto text-center">
                  <p className="text-gray-500">왼쪽에 내용을 입력하고<br/>[템플릿 생성하기] 버튼을 눌러주세요.</p>
                </div>
              )}
            </div>
            {/* 액션 버튼 그룹 */}
            {result && !isLoading && (
              <div className="mt-4 flex space-x-2">
                {/* GEN-001-BTN-002: 복사하기 */}
                <button onClick={handleCopy} className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <CopyIcon className="mr-2"/> 복사
                </button>
                {/* GEN-001-BTN-003: 보관함에 저장 */}
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <SaveIcon className="mr-2"/> 저장
                </button>
                {/* GEN-001-BTN-004: 다시 생성 */}
                <button onClick={handleGenerate} className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <RefreshCwIcon/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
