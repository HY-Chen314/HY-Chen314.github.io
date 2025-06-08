document.addEventListener('DOMContentLoaded', function() {
    // 加载并渲染tex文件
    fetch('../tex/music/sample.tex')
        .then(response => response.text())
        .then(texContent => {
            // 将$$...$$格式转换为MathJax可识别的\[...\]
            const formatted = texContent
                .replace(/\$\$(.*?)\$\$/gs, '\\[$1\\]')
                .replace(/\$(.*?)\$/g, '\\($1\\)');
            
            document.getElementById('tex-render-area').innerHTML = formatted;
            
            // 通知MathJax重新渲染
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        })
        .catch(error => {
            console.error('Error loading tex file:', error);
            document.getElementById('tex-render-area').innerHTML = 
                '<p class="error">加载公式失败，请刷新重试</p>';
        });
});
// 公式渲染完成后执行
MathJax = {
    startup: {
        ready() {
            MathJax.startup.defaultReady();
            // 强制重排解决移动端布局问题
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                window.dispatchEvent(new Event('resize'));
            }, 300);
        }
    },
    options: {
        renderActions: {
            addMenu: [0, '', '']
        }
    }
};