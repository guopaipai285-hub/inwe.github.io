// 主要JavaScript功能文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initStatsAnimation();
    initCourseFilter();
    initCourseModal();
    initContactForm();
    initCharts();
    initScrollAnimations();
    initScrollDownButton();
    initLabEquipmentCarousel();
});

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// 统计数字动画
function initStatsAnimation() {
    const statsItems = document.querySelectorAll('.stats-item');
    
    if (statsItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsItems.forEach(item => observer.observe(item));
}

function animateStats(element) {
    const targetCount = parseInt(element.dataset.count);
    const duration = parseInt(element.dataset.speed) || 2000;
    const counter = element.querySelector('.stats-number');
    
    if (!counter) return;
    
    anime({
        targets: { count: 0 },
        count: targetCount,
        duration: duration,
        easing: 'easeOutQuart',
        update: function(anim) {
            counter.textContent = Math.floor(anim.animatables[0].target.count);
        }
    });
}

// 课程筛选功能
function initCourseFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选课程卡片
            courseCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: -20,
                        duration: 200,
                        easing: 'easeInQuart',
                        complete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// 课程详情模态框
function initCourseModal() {
    const modal = document.getElementById('course-modal');
    const detailBtns = document.querySelectorAll('.course-detail-btn');
    const closeBtns = document.querySelectorAll('#close-modal, #close-modal-btn');
    
    if (!modal) return;
    
    // 打开模态框
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.dataset.course;
            openCourseModal(courseId);
        });
    });
    
    // 关闭模态框
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeCourseModal();
        });
    });
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCourseModal();
        }
    });
}

function openCourseModal(courseId) {
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const courseData = getCourseData(courseId);
    
    modalTitle.textContent = courseData.title;
    modalContent.innerHTML = courseData.content;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.getElementById('course-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function getCourseData(courseId) {
    const courses = {
        'drone-making': {
            title: '无人机智造课程',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            聚焦前沿科技无人机技术，不止于飞行，这次我们尝试"动手制造"！
                            通过对电子工程、机械组装、软件编程、工业设计等多领域的学习，
                            实现一次与众不同的"集成式"科创实践。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                完整体验智能飞行器制作全过程
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养系统工程思维和问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                专业飞手证书指导教师授课
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">12-18岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">3368元/人（12课时X199元/课时+980元材料费</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">高阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">包含材料：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 无人机组装科学材料包：主机架、电机、编程主板、桨叶、保护圈、1s500mah电池、飞机控制器等设备耗材</li>
                                    <li>• 专业安装工具套装：含可控温电烙铁、电子徽章、斜口钳、镊子等</li>
                                    <li>• 编程主板和控制器</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'ai-painting': {
            title: 'AI创意绘画课程',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            当梵高遇到AI，会碰撞出什么火花？孩子手绘草图，AI协助上色、延展、动画化，
                            学习掌握"提示词工程"这一AI时代核心技能。我们不替代孩子的创意，而是放大它！
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习AI绘画核心技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                掌握提示词工程技能
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                作品可生成NFT数字藏品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">8-16岁、成人</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">520元/人 (8课时×60元/课时 + 40元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程特色：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 获得精品画作成品挂画1幅</li>
                                    <li>• 理科生跨界新可能</li>
                                    <li>• 参加AI艺术大赛</li>
                                    <li>• 专业AI工具使用指导</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'photo-stamp': {
            title: '光敏小印章',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            艺术手帐和科技的完美结合，体验光化学反应的魅力！
                            孩子们将亲手设计图案，利用光敏材料制作个性化印章，
                            在探索科学原理的同时，培养艺术创造力和精细动手能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习光化学反应基本原理
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养艺术设计与精细动手能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                制作个性化印章作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">8-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">4课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">448元/人 (4课时×80元/课时 + 128元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">包含材料：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 光敏印章材料套装</li>
                                    <li>• 专业设计工具和模板</li>
                                    <li>• UV曝光设备</li>
                                    <li>• 印章制作工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'cyberbrick': {
            title: 'CyberBrick智能机器人',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            模块化智能生态系统，像拼搭积木般享受3D打印和编程乐趣！
                            CyberBrick将电子元件、传感器和执行器整合成模块化积木，
                            让孩子们通过直观的图形化编程，创造出能感知环境、做出反应的智能作品。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                模块化编程，降低学习门槛
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                3D打印定制零件，培养设计思维
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创造多种智能机器人作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">6-8岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1040元/人 (8课时×130元/课时 + 0元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程项目：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 智能避障小车</li>
                                    <li>• 声控机器人</li>
                                    <li>• 光感追踪装置</li>
                                    <li>• 自定义创意项目</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'steam-painting': {
            title: 'STEAM创意绘画',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            通过艺术连接科学、技术、工程、数学，达到创造性思维的提升！
                            本课程将传统绘画与科学实验相结合，让孩子们在创作过程中
                            探索色彩化学反应、物理光学原理和数学几何规律，培养跨学科思维。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                融合多学科知识的艺术创作
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养科学探索精神和艺术表达
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创作独特的科学与艺术融合作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">6-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">680元/人 (8课时×60元/课时 + 200元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 色彩化学反应绘画</li>
                                    <li>• 光影艺术创作</li>
                                    <li>• 几何图案设计</li>
                                    <li>• 自然材料艺术创作</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'shanghai-food': {
            title: '舌尖上的上海',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            PBL教学载体，融合STEAM理念，发现生活中的复杂性和丰富性问题！
                            通过探索上海传统美食文化，孩子们将学习食品科学、营养学、
                            城市历史和商业运营等多方面知识，培养解决实际问题的能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                探索上海美食文化与历史
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习食品科学与营养知识
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养项目管理和团队协作能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">6-8岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">868元/人 (8课时×80元/课时 + 228元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 上海传统美食调研</li>
                                    <li>• 食品科学实验</li>
                                    <li>• 美食文化展示设计</li>
                                    <li>• 小型美食节策划与实施</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'crocodile-lake': {
            title: '鳄鱼潭记',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            文学创作、科学实验探究、开源硬件编程为主题的创客入门课程！
                            以"鳄鱼潭"为故事背景，孩子们将通过文学创作、生态模拟、
                            传感器编程等方式，探索人与自然的关系，培养综合创新能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                融合文学创作与科学探究
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习开源硬件编程基础
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养生态保护意识与创新思维
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">9-15岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">10课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">480元课时费 + 200元材料费</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目成果：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 原创生态故事创作</li>
                                    <li>• 生态模拟实验装置</li>
                                    <li>• 互动式故事展示装置</li>
                                    <li>• 环保主题创意作品</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'woodworking': {
            title: '小工匠创造营',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            您家孩子爱拆东西？那是工程师天赋！我们把「拆家」变成「创造」，
                            从锯子刨刀到榫卯结构，让孩子亲手把木头变成会动的玩具、能用的家具。
                            在安全环境下，学习传统木工技艺与现代设计思维。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习传统木工技艺与现代工具
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养空间想象力和精细动手能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创作实用木工作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">7-14岁、成人</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">12课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1140元/人 (8课时×80元/课时 + 500元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程项目：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 木制玩具制作</li>
                                    <li>• 小型家具设计</li>
                                    <li>• 榫卯结构学习</li>
                                    <li>• 个性化木工作品创作</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'rubiks-cube': {
            title: '指尖上的最强大脑',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            一个魔方=三维立体数学课+手脑协调训练+专注力特训！
                            孩子从1小时拧不开到3分钟还原，练的是肌肉记忆，提升的是
                            空间想象力和抗挫力。系统学习多种魔方解法，参加魔方竞赛。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养空间想象力和逻辑思维
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                提升手脑协调和专注力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                参加魔方竞赛，展示成果
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">6-10岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">428元/人 (8课时×50元/课时 + 28元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">学习内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 三阶魔方基础解法</li>
                                    <li>• 高速还原技巧</li>
                                    <li>• 其他异形魔方入门</li>
                                    <li>• 魔方表演与比赛技巧</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'youth-drone': {
            title: '天空不设限，飞出新未来',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            课程对接全国青少年无人机大赛，掌握无人机的基本原理、组成部件、
                            工作原理等基础知识，并通过实践训练使学生掌握无人机的遥控操作技能。
                            从基础飞行到航拍技巧，从竞赛策略到团队协作，全方位培养无人机操控能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习无人机原理与操控技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养空间感知与精准操控能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                参加青少年无人机竞赛
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">10-18岁、成人</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1592元/人 (8课时×199元/课时)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-red-600">高阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">训练内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 无人机原理与安全知识</li>
                                    <li>• 基础飞行技巧训练</li>
                                    <li>• 航拍与图像处理</li>
                                    <li>• 竞赛项目模拟训练</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'robomaster': {
            title: '大疆RoboMaster机甲大师赛',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            想让孩子站上国际舞台？大疆RoboMaster是全球最酷的机器人竞技赛！
                            从零搭建机甲、编写视觉识别算法到团队战术配合，这是一门「准大学生机器人课程」。
                            培养工程思维、编程能力和团队协作精神，为未来科技竞赛打下坚实基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习机器人工程与编程
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养系统思维与问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                参加RoboMaster青少年挑战赛
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">9-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1100元/人 (8课时×130元/课时 + 60元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-red-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 机器人机械结构设计</li>
                                    <li>• 视觉识别与自主导航</li>
                                    <li>• 团队战术与竞赛策略</li>
                                    <li>• 实战对抗与调试优化</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'toddler-coding': {
            title: '不玩平板，玩编程思维',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            用无屏幕实物编程模块+图形化软件，把抽象代码变成摸得着的积木。
                            小猪佩奇过马路、小恐龙找妈妈……每个故事都是一节逻辑思维课。
                            通过游戏化学习，培养幼儿的计算思维和问题解决能力，远离屏幕依赖。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                无屏幕编程，保护视力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养逻辑思维与问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                游戏化学习，激发兴趣
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">3-6岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">10课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">600元/人 (10课时×60元/课时，自带电脑)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">学习内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 顺序与循环概念</li>
                                    <li>• 条件判断思维</li>
                                    <li>• 故事化编程游戏</li>
                                    <li>• 简单算法启蒙</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'lego-basic': {
            title: '乐高-搭建（基础）',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            5000块乐高能搭出什么？一个孩子想象中的世界！
                            从摩天大楼到旋转木马，我们教的不是「照图搭」，而是「解决问题」。
                            通过乐高搭建，培养空间想象力、结构思维和创造力，为后续机械和编程学习打下基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养空间想象力与结构思维
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习基础建筑与工程原理
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                激发创造力与表达能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">4-8岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">480元/人 (8课时×60元/课时 + 0元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">搭建主题：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 城市建筑与交通</li>
                                    <li>• 动物世界与自然</li>
                                    <li>• 游乐设施与机械</li>
                                    <li>• 创意自由搭建</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        '3d-printing': {
            title: '3D打印建模',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            孩子画在纸上的奇思妙想，我们可以「打印」出来！
                            从Tinkercad入门到Fusion360进阶，学习3D建模核心技能，
                            亲手设计手机支架、玩偶、机器人零件并打印成品，将创意变为现实。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习专业3D建模软件
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                掌握3D打印技术与工艺
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                将创意设计转化为实体作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">8-16岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">12课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1560元/人 (12课时×105元/课时 + 300元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">学习内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Tinkercad基础建模</li>
                                    <li>• Fusion360进阶设计</li>
                                    <li>• 3D打印机操作与维护</li>
                                    <li>• 实用物品设计与打印</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'lego-mechanical': {
            title: '乐高-机械（进阶）',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            杠杆、滑轮、齿轮、连杆……这些枯燥的物理名词，在乐高机械课里就是让孩子尖叫的魔法！
                            搭建投篮机器人、抓物机械臂、风力发电机，理解真实机械原理，
                            将抽象物理知识转化为具体可操作的机械结构。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习机械原理与物理知识
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养工程思维与问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创造功能性机械作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">7-14岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">480元/人 (8课时×60元/课时)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">机械项目：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 齿轮传动与变速装置</li>
                                    <li>• 投篮机器人与机械臂</li>
                                    <li>• 风力与水力发电模型</li>
                                    <li>• 自动化机械装置</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'scratch': {
            title: '编程课-Scratch',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            孩子沉迷游戏？那就教他们「制造游戏」！
                            Scratch图形化编程，拖拽积木就能做动画、编故事、设计小游戏。
                            课程融合数学、艺术、音乐，培养计算思维和创意表达，为后续学习代码编程打下基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习编程思维与逻辑构建
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养创意表达与问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创作互动游戏与动画作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">7-10岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">480元/人 (8课时×60元/课时，自带电脑)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目作品：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 互动故事与动画</li>
                                    <li>• 平台跳跃小游戏</li>
                                    <li>• 音乐创作与节奏游戏</li>
                                    <li>• 数学学习工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'python': {
            title: '编程课-Python',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            小学四年级就能学真编程！Python是人工智能第一语言，
                            我们的课程从海龟画图到数据分析，从爬虫到机器学习入门，
                            直击CSP-J/S信奥赛考点，为未来科技发展打下坚实基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习Python编程基础与进阶
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                接触AI与数据分析技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                为信奥赛和科技创新做准备
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">10-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">480元/人 (8课时×60元/课时，自带电脑)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">学习内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Python基础语法与数据结构</li>
                                    <li>• 海龟绘图与游戏开发</li>
                                    <li>• 网络爬虫与数据分析</li>
                                    <li>• AI与机器学习入门</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'electronics-welding': {
            title: '电子制作项目课程～焊接',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            你想孩子理解「智能」背后的原理吗？从认识电阻电容到亲手焊接电子徽章，
                            每一道焊锡都是通向物联网世界的桥梁。专业工程师授课，恒温焊台+防烫措施，安全有保障。
                            通过实际项目，学习电子基础知识和实用技能。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习电子基础与焊接技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养精细操作与安全意识
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创作实用电子作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">9-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1000元/人 (8课时×80元/课时+360元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 电子元件识别与电路原理</li>
                                    <li>• 焊接技术与安全操作</li>
                                    <li>• 电子徽章制作</li>
                                    <li>• 简单电子产品组装</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'vex-robotics': {
            title: 'VEX机器人编程',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            VEX是全球参与最广泛的机器人竞赛，从IQ到V5，我们的课程体系完整对接。
                            设计、搭建、编程、操控四位一体，每节课都在解决真实工程问题：
                            如何让机械臂更精准？怎么让自动程序更稳定？培养综合工程能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习机器人工程与编程
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养系统思维与问题解决能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                参加VEX机器人竞赛
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">9-12岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">16课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">2080元 (16课时×130元/课时 + 0元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-red-600">高阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">课程内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• VEX机器人机械设计</li>
                                    <li>• 传感器应用与自动控制</li>
                                    <li>• VEX编程与算法优化</li>
                                    <li>• 竞赛策略与团队配合</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'laser-creation': {
            title: '激光造物',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            精度0.1mm的激光切割机，让孩子的设计瞬间变成艺术品！
                            从平面图案到立体榫卯，从亚克力灯牌到木质模型，学习CAD绘图、材料特性、安全操作。
                            课程融合艺术设计与工程思维，培养现代制造能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习CAD设计与激光切割技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养精密设计与工程思维
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                创作实用与艺术结合的作品
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">10-16岁、成人</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">940元 (8课时×80元/课时 + 300元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-red-600">高阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">创作项目：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 平面图案设计与切割</li>
                                    <li>• 立体结构设计与组装</li>
                                    <li>• 亚克力灯牌制作</li>
                                    <li>• 个性化创意作品</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'physics-application': {
            title: '科创项目课-物理应用',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            初中物理预学+科创竞赛双保险，用项目制把物理知识"演"出来。
                            制作潜水艇模型理解浮力，搭建智能家居理解电路原理，让抽象的物理概念变得直观有趣。
                            通过动手实践，培养科学探究能力和创新思维，为未来学习打下坚实基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                初中物理知识提前掌握
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                动手实践理解物理原理
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养科学探究与创新能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">12-15岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">16课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1580元/人 (16课时×80元/课时+300元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">实践项目：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 潜水艇模型制作与浮力实验</li>
                                    <li>• 智能家居电路设计与搭建</li>
                                    <li>• 光学望远镜制作与光学原理</li>
                                    <li>• 电磁铁制作与电磁现象探究</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'ai-multidisciplinary': {
            title: 'AI+多学科融合',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            面向未来的跨学科课程，用AI工具学英语、做数学题、写科幻小说，培养"会提问、会协作、会创造"的AI原住民。
                            课程融合语文、数学、历史、科学等多学科知识，通过AI工具辅助学习，让孩子掌握未来必备的AI素养。
                            孩子将学习数据标注、模型微调等AI技术，培养驾驭AI的能力。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                掌握AI工具使用方法
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                跨学科知识融合应用
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养AI时代核心素养
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">10-16岁、成人</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">12课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">720元 (12课时×60元/课时 + 0元材料费，自带电脑)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">学习内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• AI辅助英语学习与写作</li>
                                    <li>• AI工具解决数学问题</li>
                                    <li>• AI创作科幻小说与艺术作品</li>
                                    <li>• 数据标注与模型微调基础</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'bionic-butterfly': {
            title: '"仿生蝴蝶"科创',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            掌握仿生学基本原理，理解扑翼飞行气动差异，学习电子基础知识和3D打印工艺，完成仿生蝴蝶组装与调试。
                            学生将学习舵机控制、锂电池管理、碳纤维材料应用等先进技术，通过团队协作完成仿生蝴蝶的制作。
                            课程培养工程思维、动手能力和问题解决能力，为参加科技创新大赛打下基础。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习仿生学原理与应用
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                掌握电子与机械组装技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养团队协作与创新能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">12-18岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">20课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">5560元 (20课时×199元/课时 + 1580元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-red-600">高阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 仿生学原理与气动差异研究</li>
                                    <li>• 电子基础知识与电路设计</li>
                                    <li>• 3D打印工艺与材料应用</li>
                                    <li>• 仿生蝴蝶组装、调试与操控</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        '3d-print-paper-circuit': {
            title: '3D打印笔+纸电路',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            STEM教育最新趋势——"硬科技软着落"理念，将复杂电子原理转化为可视化、可触摸的创意实践。
                            本课程融合纸电路手工与3D打印笔建模两大创客工具，让学生在安全、低成本的创作中体验"电子工程师"与"产品设计师"的双重角色，
                            实现从平面电路到立体造型的跨维度创造。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                学习基础电子原理与电路设计
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                掌握3D打印笔立体建模技术
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养跨学科思维与创造能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">6-10岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">8课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">760元 (8课时×60元/课时 + 280元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-green-600">入门</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">项目内容：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 纸电路基础知识与安全操作</li>
                                    <li>• 3D打印笔使用技巧与立体造型</li>
                                    <li>• 电子元件与创意造型结合</li>
                                    <li>• 创意电子作品设计与制作</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'stickman-thinking': {
            title: '火柴人可视化思维',
            content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程介绍</h3>
                        <p class="text-gray-600 mb-4">
                            通过绘画的方式打开思路，《火柴人可视化思维》重点是思维二字，这里的课程设计不是针对一个单一的教画画的老师，
                            而是跨学科综合实践者，希望带给孩子的是以后面对复杂人生，做好更多准备的能力。
                            课程通过简单火柴人绘画形式，帮助学生建立可视化思维模式，提高表达能力和逻辑思维。
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                培养批判性思考和解决问题能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                提升沟通与协作能力
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke="join="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                发展创造与革新能力
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">课程详情</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">适合年龄：</span>
                                <span class="font-medium">8-14岁</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程时长：</span>
                                <span class="font-medium">12课时</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">课程费用：</span>
                                <span class="font-medium text-blue-600">1260元 (12课时×90元/课时 + 180元材料费)</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">难度等级：</span>
                                <span class="font-medium text-orange-600">中阶</span>
                            </div>
                            <div class="mt-6">
                                <h4 class="font-bold text-gray-900 mb-2">能力培养：</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• 收集信息与转化的能力</li>
                                    <li>• 信息应用和表达的能力</li>
                                    <li>• 灵活性与适应能力</li>
                                    <li>• 主动性与自我导向</li>
                                    <li>• 社交能力与责任感</li>
                                    <li>• 高效的生产力</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        // 可以继续添加其他课程的详细信息
    };
    
    return courses[courseId] || { title: '课程详情', content: '<p>课程详情即将推出...</p>' };
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 表单验证
        if (validateForm()) {
            // 收集表单数据
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // 显示提交中状态
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '提交中...';
            submitBtn.disabled = true;
            
            // 模拟发送到邮箱（实际项目中需要后端支持）
            setTimeout(() => {
                console.log('表单数据已发送至 infuture123@163.com:', data);
                
                // 显示成功消息
                showSuccessMessage();
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

function validateForm() {
    const requiredFields = ['parent-name', 'child-name', 'phone', 'child-age', 'course-interest'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else if (field) {
            field.classList.remove('border-red-500');
        }
    });
    
    // 验证隐私政策同意
    const privacyCheckbox = document.getElementById('privacy-agree');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        isValid = false;
    }
    
    return isValid;
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // 3秒后自动隐藏
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

// 图表初始化
function initCharts() {
    // 年龄分布图表
    const ageChart = document.getElementById('ageChart');
    if (ageChart) {
        new Chart(ageChart, {
            type: 'doughnut',
            data: {
                labels: ['3-6岁', '7-12岁', '13-18岁', '成人'],
                datasets: [{
                    data: [25, 40, 25, 10],
                    backgroundColor: ['#f97316', '#2563eb', '#10b981', '#8b5cf6']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // 课程类型分布图表
    const courseChart = document.getElementById('courseChart');
    if (courseChart) {
        new Chart(courseChart, {
            type: 'bar',
            data: {
                labels: ['无人机', 'AI绘画', '机器人', '魔方', '乐高', '电子'],
                datasets: [{
                    label: '参与人数',
                    data: [45, 38, 52, 35, 42, 28],
                    backgroundColor: '#2563eb'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// 滚动动画
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .course-card, .case-card, .testimonial-card');
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuart',
                    delay: Math.random() * 200
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// 滚动到服务特色部分
function initScrollDownButton() {
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.feature-card').closest('section');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出函数供其他脚本使用
window.YinweiInnovation = {
    showSuccessMessage,
    validateForm,
    debounce
};

// 实验室装备轮播功能
function initLabEquipmentCarousel() {
    const carousel = document.getElementById('lab-carousel');
    if (!carousel) return;
    
    const carouselContainer = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('#carouselIndicators button');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let slideInterval;
    const autoPlayDelay = 4000; // 4秒切换一次
    
    // 初始化轮播
    function initCarousel() {
        // 设置初始状态
        updateSlidePosition();
        
        // 开始自动播放
        startAutoPlay();
        
        // 绑定事件
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pauseAutoPlay();
                goToSlide(currentSlide - 1);
                startAutoPlay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pauseAutoPlay();
                goToSlide(currentSlide + 1);
                startAutoPlay();
            });
        }
        
        // 指示器点击事件
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                pauseAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', pauseAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 更新轮播位置
    function updateSlidePosition() {
        if (carouselContainer) {
            carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.remove('bg-white/60');
                indicator.classList.add('bg-white');
            } else {
                indicator.classList.remove('bg-white');
                indicator.classList.add('bg-white/60');
            }
        });
    }
    
    // 跳转到指定幻灯片
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        
        updateSlidePosition();
    }
    
    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // 开始自动播放
    function startAutoPlay() {
        pauseAutoPlay();
        slideInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    // 暂停自动播放
    function pauseAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // 初始化
    initCarousel();
}

// 页面加载完成后初始化轮播功能
// 注意：此函数将在现有的DOMContentLoaded事件监听器中被调用
// 请在main.js文件开头的DOMContentLoaded事件监听器中添加 initLabEquipmentCarousel(); 调用