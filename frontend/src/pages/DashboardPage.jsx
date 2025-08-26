import React, { useState, useMemo } from 'react';

// 아이콘 컴포넌트 (Lucide 아이콘 스타일의 인라인 SVG)
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const CopyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);
const TrashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

// 템플릿 보관함에 표시될 가상의 데이터 (목업 데이터)
const mockTemplates = [
  { id: 1, title: '[과제 안내]', content: '안녕하세요, #{고객명}학부모님. #{과목명} 과제 관련 안내드립니다...', savedAt: '2023-10-27' },
  { id: 2, title: '[출석 공지]', content: '금일 #{수업명} 수업 출석률이 저조하여 공지드립니다. 확인 부탁드립니다...', savedAt: '2023-10-26' },
  { id: 3, title: '[이벤트 당첨]', content: '축하합니다! #{고객명}님. 가을맞이 이벤트에 당첨되셨습니다...', savedAt: '2023-10-25' },
  { id: 4, title: '[결제 완료]', content: '#{고객명}님의 #{상품명} 결제가 정상적으로 완료되었습니다. 감사합니다.', savedAt: '2023-10-24' },
];

export default function DashboardPage() {
  // 컴포넌트의 상태(State)를 관리합니다.
  const [templates, setTemplates] = useState(mockTemplates); // 템플릿 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어

  // 검색어에 따라 템플릿 목록을 필터링합니다.
  // useMemo를 사용하여 검색어가 변경될 때만 필터링을 다시 실행하도록 최적화합니다.
  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return templates;
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  // 내용 복사 버튼 핸들러
  const handleCopy = (content) => {
    const textArea = document.createElement('textarea');
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('템플릿 내용이 복사되었습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.' + err);
    }
    document.body.removeChild(textArea);
  };

  // 삭제 버튼 핸들러
  const handleDelete = (templateId) => {
    // 명세서에 따라 삭제 확인 절차를 추가합니다.
    // 실제 앱에서는 window.confirm 대신 직접 구현한 모달(Modal) 컴포넌트를 사용하는 것이 좋습니다.
    if (window.confirm('정말로 이 템플릿을 삭제하시겠습니까?')) {
      setTemplates(templates.filter((t) => t.id !== templateId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">템플릿 보관함</h1>
          <p className="text-gray-600 mt-1">저장한 템플릿을 관리하고 재사용할 수 있습니다.</p>
        </header>

        {/* DASH-001-INP-001: 템플릿 검색 */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="템플릿 제목 또는 내용으로 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* DASH-001-LST-001: 템플릿 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{template.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 h-20 overflow-hidden">{template.content}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-4">저장일: {template.savedAt}</p>
                  <div className="flex space-x-2">
                    {/* DASH-001-BTN-001: 내용 복사 버튼 */}
                    <button 
                      onClick={() => handleCopy(template.content)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <CopyIcon className="mr-2"/> 복사
                    </button>
                    {/* DASH-001-BTN-002: 삭제 버튼 */}
                    <button 
                      onClick={() => handleDelete(template.id)}
                      className="inline-flex items-center justify-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 저장된 템플릿이 없을 경우의 메시지
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                {searchTerm ? `'${searchTerm}'에 대한 검색 결과가 없습니다.` : '저장된 템플릿이 없습니다.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
