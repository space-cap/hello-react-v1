import React, { useState } from 'react';
import axios from 'axios'; // HTTP 통신을 위한 axios 라이브러리 임포트

function App() {
  // 서버로부터 받은 메시지를 저장할 상태(state)를 생성합니다. 초기값은 빈 문자열입니다.
  const [message, setMessage] = useState('');
  // 로딩 상태를 표시하기 위한 상태를 생성합니다.
  const [loading, setLoading] = useState(false);
  // 에러 메시지를 저장할 상태를 생성합니다.
  const [error, setError] = useState(null);

  // 버튼 클릭 시 실행될 함수입니다.
  const fetchData = async () => {
    try {
      // 데이터 요청 시작 시, 기존 메시지와 에러를 초기화하고 로딩 상태를 true로 설정합니다.
      setMessage('');
      setError(null);
      setLoading(true);

      // axios를 사용하여 Spring Boot API에 GET 요청을 보냅니다.
      // await 키워드를 사용하여 요청이 완료될 때까지 기다립니다.
      const response = await axios.get('http://localhost:8080/api/hello' );

      // 요청이 성공하면, 응답 데이터(response.data)에서 message 값을 추출하여 상태를 업데이트합니다.
      // Spring Boot에서 보낸 JSON 객체는 response.data에 담겨 있습니다. (예: { message: "..." })
      setMessage(response.data.message);

    } catch (e) {
      // 요청 중 에러가 발생하면, 에러 상태를 업데이트합니다.
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error(e); // 콘솔에 에러를 출력하여 디버깅을 돕습니다.
    } finally {
      // 요청 성공/실패 여부와 관계없이, 작업이 끝나면 로딩 상태를 false로 설정합니다.
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>React & Spring Boot 연동 예제</h1>
      
      {/* 버튼을 클릭하면 fetchData 함수가 호출됩니다. */}
      <button onClick={fetchData} disabled={loading}>
        {loading ? '로딩 중...' : '서버에서 데이터 불러오기'}
      </button>

      {/* message 상태에 값이 있으면 화면에 표시합니다. */}
      {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e7f3ff' }}>
          <h2>서버 응답:</h2>
          <p>{message}</p>
        </div>
      )}

      {/* error 상태에 값이 있으면 화면에 표시합니다. */}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
