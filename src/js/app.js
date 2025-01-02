// DOM操作演示
document.addEventListener('DOMContentLoaded', () => {
    // DOM操作
    const addElementBtn = document.getElementById('add-element');
    const elementContainer = document.getElementById('element-container');
    let elementCount = 0;

    addElementBtn.addEventListener('click', () => {
        // 演示DOM节点的创建和插入
        const newElement = document.createElement('div');
        elementCount++;
        newElement.textContent = `动态创建的元素 ${elementCount}`;
        newElement.style.padding = '5px';
        newElement.style.margin = '5px';
        newElement.style.backgroundColor = '#e8f0fe';
        
        // 演示DOM事件委托
        newElement.addEventListener('click', (e) => {
            console.log('元素被点击:', e.target.textContent);
            // 演示DOM节点的删除
            e.target.remove();
        });
        
        elementContainer.appendChild(newElement);
    });

    // 存储机制演示
    const storageInput = document.getElementById('storage-input');
    const saveLocalBtn = document.getElementById('save-local');
    const saveSessionBtn = document.getElementById('save-session');
    const storageDisplay = document.getElementById('storage-display');

    // localStorage演示
    saveLocalBtn.addEventListener('click', () => {
        try {
            const data = storageInput.value;
            localStorage.setItem('demoData', data);
            updateStorageDisplay();
        } catch (error) {
            console.error('localStorage 错误:', error);
            alert('存储失败: ' + error.message);
        }
    });

    // sessionStorage演示
    saveSessionBtn.addEventListener('click', () => {
        try {
            const data = storageInput.value;
            sessionStorage.setItem('demoData', data);
            updateStorageDisplay();
        } catch (error) {
            console.error('sessionStorage 错误:', error);
            alert('存储失败: ' + error.message);
        }
    });

    function updateStorageDisplay() {
        const localData = localStorage.getItem('demoData');
        const sessionData = sessionStorage.getItem('demoData');
        storageDisplay.innerHTML = `
            <p>LocalStorage: ${localData || '空'}</p>
            <p>SessionStorage: ${sessionData || '空'}</p>
        `;
    }

    // 网络请求演示
    const fetchDataBtn = document.getElementById('fetch-data');
    const responseContainer = document.getElementById('response-container');

    fetchDataBtn.addEventListener('click', async () => {
        try {
            responseContainer.textContent = '加载中...';
            // 使用JSONPlaceholder API（支持CORS的测试API）
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            responseContainer.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        } catch (error) {
            console.error('Fetch 错误:', error);
            responseContainer.textContent = '请求失败: ' + error.message;
        }
    });

    // 渲染过程演示
    const triggerReflowBtn = document.getElementById('trigger-reflow');
    const triggerRepaintBtn = document.getElementById('trigger-repaint');
    const renderElement = document.getElementById('render-element');

    // 触发回流(reflow)
    triggerReflowBtn.addEventListener('click', () => {
        // 读取布局属性会强制浏览器进行回流
        const currentWidth = renderElement.offsetWidth;
        renderElement.style.width = (currentWidth + 50) + 'px';
        renderElement.style.height = (currentWidth + 50) + 'px';
    });

    // 触发重绘(repaint)
    triggerRepaintBtn.addEventListener('click', () => {
        // 仅修改颜色只会触发重绘
        renderElement.style.backgroundColor = 
            '#' + Math.floor(Math.random()*16777215).toString(16);
    });

    // 性能监控演示
    if ('PerformanceObserver' in window) {
        const performanceObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log('Performance Entry:', {
                    name: entry.name,
                    startTime: entry.startTime,
                    duration: entry.duration,
                    entryType: entry.entryType
                });
            });
        });

        // 监控各种性能指标
        try {
            performanceObserver.observe({ 
                entryTypes: ['resource', 'paint', 'layout-shift', 'largest-contentful-paint'] 
            });
        } catch (error) {
            console.warn('Performance API 不可用:', error);
        }
    }
});

// 浏览器事件循环演示
function demonstrateEventLoop() {
    console.log('1. 同步代码执行');

    setTimeout(() => {
        console.log('4. 宏任务执行 (setTimeout)');
    }, 0);

    Promise.resolve().then(() => {
        console.log('3. 微任务执行 (Promise)');
    });

    console.log('2. 同步代码继续执行');
}

// 启动事件循环演示
demonstrateEventLoop();