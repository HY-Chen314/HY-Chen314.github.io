// 确保按钮图标加载
function checkIconsLoaded() {
    const icons = document.querySelectorAll('.fa-bars');
    icons.forEach(icon => {
        if (!icon || !icon.style.fontFamily || !icon.style.fontFamily.includes('FontAwesome')) {
            // 如果图标没加载，显示备用内容
            icon.parentElement.textContent = '☰';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    checkIconsLoaded();
    
    // 原有代码...
});
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM已加载"); // 调试点1

    const renderArea = document.getElementById('tex-render-area');
    if (!renderArea) {
        console.error('错误: 未找到渲染区域');
        return;
    }

    window.MathJax = {
        tex: {
            inlineMath: [['\\(', '\\)']],
            displayMath: [['\\[', '\\]']],
            processEscapes: true
        },
        options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
        },
        startup: {
            pageReady: () => {
                console.log("MathJax初始化完成"); // 调试点2
                return MathJax.startup.defaultPageReady();
            }
        }
    };

    fetch('/tex/physics/sample.tex')
        .then(response => {
            console.log("HTTP状态码:", response.status); // 调试点3
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(texContent => {
            console.log("原始文件内容:", texContent); // 调试点4
            
            const formatted = texContent
                .replace(/\$\$(.*?)\$\$/gs, '\\[$1\\]')
                .replace(/\$(.*?)\$/g, '\\($1\\)');
            
            console.log("格式化后内容:", formatted); // 调试点5
            renderArea.innerHTML = formatted;

            return MathJax.typesetPromise();
        })
        .then(() => {
            console.log("公式渲染完成"); // 调试点6
        })
        .catch(error => {
            console.error("完整错误链:", error);
            renderArea.innerHTML = `
                <div style="color:red; border:1px solid #f99; padding:10px;">
                    <p>加载失败: ${error.message}</p>
                    <p>文件路径: ${new URL('../tex/math/sample.tex', window.location.href)}</p>
                    <details><summary>技术详情</summary><pre>${error.stack}</pre></details>
                </div>
            `;
        });
});
document.addEventListener("DOMContentLoaded", function() {
    const renderArea = document.getElementById("tex-render-area");
    renderArea.innerHTML = `
      <p>行内公式: \( \sqrt{2} \)</p>
      <p>块级公式: \[ \int_a^b f(x)dx \]</p>
    `;
    
    // 手动触发 MathJax 渲染
    if (window.MathJax) {
      MathJax.typesetPromise();
    } else {
      console.error("MathJax 未加载！");
    }
  });