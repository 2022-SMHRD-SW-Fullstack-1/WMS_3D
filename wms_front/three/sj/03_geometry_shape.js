import * as THREE from '../build/three.module.js';
// 마우스를 이용해 Object를 회전시키기 위한 코드
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

// 창고 생성버튼
const btn_create_shelf = document.querySelector("#btn_create_shelf")
const shelf_width = document.querySelector("#shelf_width");
const shelf_length = document.querySelector("#shelf_length");
const shelf_floor = document.querySelector("#shelf_hegiht");

// three.js의 구성

// 1. Renderer : Scene을 모니터에 렌더링(출력)할 수 있는 장치

// 1-1. Scene : 3차원 객체로 구성되는 장면

// 1-1-1. Light : 3차원 형상을 화면에 표시하기위한 광원
// 1-1-2. Mesh (Object3D) : Object3D의 파생 클래스

// 1-1-2-1. Geometry : 형상을 정의
// 1-1-2-2. Material : 색상 및 투명도 정의

// 1-2. Camera : Scene을 어떤 지점에서 볼지를 정하는 장치
let x = localStorage.getItem('x')
let y = localStorage.getItem('y')

x = x.split(',')
y = y.split(',')



class App{
    // 약속
    // 1. "_"이 앞에 붙은 메서드는 이 App클래스 내부에서만 사용되는 private라는 뜻


    constructor() {
        // html에서 3D를 띄워줄 div 선언하기
        const divContainer = document.querySelector("#webgl-container");
        // 다른 메서드에서 참조할 수 있도록 field로 정의
        this._divContainer = divContainer;

        // Renderer 생성 (antialias : 렌더링 시 물체의 경계선을 부드럽게 표시)
        const renderer = new THREE.WebGLRenderer({antialias:true});
        // pixel의 ratio값 설정
        renderer.setPixelRatio(window.devicePixelRatio);
        // renderer의 domElement를 id가 webgl-container인 div의 자식으로 추가
        divContainer.appendChild(renderer.domElement);
        // 다른 메서드에서 참조할 수 있도록 field로 정의
        this._renderer = renderer; // 이 renderer는 canvas타입의 dom 객체

        
        this._raycaster = new THREE.Raycaster(); // create once

        // scene객체 생성
        const scene = new THREE.Scene();
        // 다른 메서드에서 참조할 수 있도록 field로 정의
        scene.background = new THREE.Color(0.8, 0.8, 0.9);
        this._scene = scene;

        // 메서드 호출 (아직 정의 X)
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._setupEvents();

        // window.onresize : 창 크기 변경시 발동되는 장치
        // renderer와 camera는 창 크기가 변경될 때마다 그 크기에 맞게 속성값을 재설정 해줘야 하기 때문
        // bind : resize method안에서 this가 가르키는 객체가 이벤트 객체가 아닌 이 App
        //          클래스의 객체가 되도록하기 위해 사용
        window.onresize = this.resize.bind(this);
        this.resize();

        // render : 3차원 그래픽 장면을 만들어주는 메서드
        // render메서드를 requestAnimationFrame에 넘겨줌으로써 render메서드 호출
        // bind를 사용한 이유 : render메서드의 코드안에서 사용되는 this가 바로 이
        //                      app클래스의 객체를 가르키기 위해
        requestAnimationFrame(this.render.bind(this));
    }

    _setupEvents(){


        
        const clickMouse = new THREE.Vector2();  // create once
        const moveMouse = new THREE.Vector2();   // create once
        var draggable;

        let raycaster = this._raycaster
        let camera = this._camera
        let scene = this._scene
        let renderer = this._renderer

        function intersect(pos) {
            raycaster.setFromCamera(pos, camera);
        return raycaster.intersectObjects(scene.children);
        }

        


        window.addEventListener('click', event => {
            
        if (draggable != null) {
            console.log(`dropping draggable ${draggable.userData.name}`)
            draggable = null
            return;
        }

        // THREE RAYCASTER
        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        let found = intersect(clickMouse);

        if (found.length > 0) {
            if (found[0].object.parent.userData.draggable) {
            draggable = found[0].object.parent
            console.log(`found draggable ${draggable.userData.name}`)
            }
        }
        })

        window.addEventListener('mousemove', event => {
        moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        var intervalId;
        window.addEventListener('mousedown',event=>{
             // THREE RAYCASTER
        clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        let found = intersect(clickMouse);

            if (found[0].object.geometry.type == "BoxGeometry") {

                intervalId = setInterval(function() {
                    
                    found[0].object.parent.rotation.y += 0.1 
                }, 100);
                return;
            }
        })
        window.addEventListener('mouseup', function() {
			clearInterval(intervalId);
		});



        function animate() {
            dragObject();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          }

        function dragObject() {
        if (draggable != null) {

            
            const found = intersect(moveMouse);
            if (found.length > 0) {
            for (let i = 0; i < found.length; i++) {
                if (!found[i].object.userData.ground)
                continue
                
                let target = found[i].point;
                draggable.position.x = target.x
                draggable.position.z = target.z
            }
            }
        }
        }
        animate();
    }



    _setupControls(){
        // OrbitControls : 마우스로 화면을 컨트롤하는 기능
        // OrbitControls객체 = 카메라 객체 + 마우스 이벤트를 받는 Dom요소
        new OrbitControls(this._camera, this._divContainer);
    }

    // 위에서 정의하지 않고 호출만 한 메서드 생성
    _setupCamera(){
        // three.js가 3차원 그래픽을 출력할 영역의 가로, 세로 크기를 가져오기
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        // 카메라 객체 생성
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.x = 3;
        camera.position.y = 3;
		camera.position.z = 50;
        this._camera = camera;
    }
    _setupLight(){
        const color = 0xffffff;
		const intensity = 0.5;
		const light = new THREE.DirectionalLight(color, intensity);
		const light1 = new THREE.DirectionalLight(color, intensity);
		const light2 = new THREE.DirectionalLight(color, intensity);
		const light3 = new THREE.DirectionalLight(color, intensity);
		const light4 = new THREE.DirectionalLight(color, intensity);
		light.position.set(0, 10, 0);
		light1.position.set(25, 10, 30);
		light2.position.set(-25, 10, 30);
		light3.position.set(25, 10, -30);
		light4.position.set(-25, 10, -30);
		this._scene.add(light);
		this._scene.add(light1);
		this._scene.add(light2);
		this._scene.add(light3);
		this._scene.add(light4);
    }
    // 파란색 정육면체 mesh 생성
    _setupModel(){

        this._setFloor()

        
        
}

    _setFloor(){

        // 라인과 정육면체를 합칠 수 있도록 group 객체생성
const group = new THREE.Group();
// 그룹안에 정육면체와 라인 넣기
        const shape = new THREE.Shape();
        
        shape.moveTo(Number(x[0]-30),-Number(y[0])+14);      // 시작지점 설정
    
        for(let i=1; i<x.length;i++){
            shape.lineTo(Number(x[i]-30),-Number(y[i])+14)

        }
        for(let j=1; j<x.length;j++){
            let line = new THREE.Shape();
            line.moveTo(Number(x[j-1]-30),-Number(y[j-1])+14)
            line.lineTo(Number(x[j]-30),-Number(y[j])+14)
            line.closePath();  

            let set = {
                steps: 1,   // 깊이 방향으로의 분할 수
                depth: 5,   // 깊이 값
                bevelEnabled: true,    // 베벨링 처리를 할것인지?
                bevelThickness: 0,   // 베벨링 두께
                bevelSize: 0,        // shape의 기본값으로 얼마나 베벨링 할지?
                bevelSegments: 0,   // 베벨링을 얼마나 부드럽게?
            }

            let geo = new THREE.ExtrudeGeometry(line, set);
            let fill = new THREE.MeshPhongMaterial({color:0xffffff});
            let wall = new THREE.Mesh(geo,fill);
            group.add(wall)


        }



        shape.closePath();      // 도형이 열여있다면 닫기


    
    // extrude를 생성하기 위한 세팅값
    const settings = {
        steps: 1,   // 깊이 방향으로의 분할 수
        depth: 1,   // 깊이 값
        bevelEnabled: true,    // 베벨링 처리를 할것인지?
        bevelThickness: 0,   // 베벨링 두께
        bevelSize: 0,        // shape의 기본값으로 얼마나 베벨링 할지?
        bevelSegments: 0,   // 베벨링을 얼마나 부드럽게?
    }

    const geometry = new THREE.ExtrudeGeometry(shape, settings);
    

const fillMaterial = new THREE.MeshPhongMaterial({color:0xffffff});

const cube = new THREE.Mesh(geometry,fillMaterial);

// 노란색 라인 생성
const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
const line = new THREE.LineSegments(
    // WireframeGeometry : 모델의 외각선 표시
    new THREE.WireframeGeometry(geometry),lineMaterial);




group.add(cube);
// group.add(line);
group.rotation.x = -Math.PI/2;

    cube.userData.ground = true;

// scene객체의 구성요소로 cube추가
this._scene.add(group)
// 다른 메서드에서 참조할 수 있도록 field로 정의
this._cube = group;


btn_create_shelf.addEventListener("click",()=>{
    this._createShelfs(Number(shelf_width.value),Number(shelf_length.value),Number(shelf_floor.value))
})
// this._createShelfs();


    }

    _createShelfs(w,l,f){
        this._createShelf("B선반",{x:0,y:0},{width : w,length :l,floor :f},false);

       }

    _createShelf(meshName,boardPos,shelf_info,rotation){
            const group2 = new THREE.Group();
            // 기본 바 생성
            const shelfBarGeometry = new THREE.CylinderGeometry(0.03,0.03,shelf_info.floor-1+0.2)
            const shelfBarMaterial = new THREE.MeshPhongMaterial({
                color : 0x0000aa, emissive : 0x112244, flatShading:true
            })
            // 기본 판 생성
            const shelfFloorGeometry = new THREE.BoxGeometry(shelf_info.width,0.05,shelf_info.length)
            const shelfFloorMaterial = new THREE.MeshPhongMaterial({
                color : 0xffaa00, emissive : 0x112244, flatShading:true
            })
            for(let i=0;i<4;i++){
                // 바생성
                const shelfBarMesh =new THREE.Mesh(shelfBarGeometry,shelfBarMaterial);
                let x = 1;
                let z = 1;
                if(i==1){
                    z=-1;
                }else if(i==2){
                    x=-1;
                    z=-1;
                }else if(i==3){
                    x=-1;
                }
                shelfBarMesh.position.x = shelf_info.width/2*x;
                shelfBarMesh.position.y = 1/2*(shelf_info.floor)+(0.6);
                shelfBarMesh.position.z = 1/2*z*shelf_info.length;
                group2.add(shelfBarMesh);
            }
            for(let i=0;i<shelf_info.floor+1;i++){
                // 판 생성
                const shelfFloorMesh = new THREE.Mesh(shelfFloorGeometry,shelfFloorMaterial)
                shelfFloorMesh.position.y = (i*1)+0.1;
                group2.add(shelfFloorMesh);
            }
        
            if(rotation==true){
                group2.rotation.y =-Math.PI/2;
            }
            group2.position.set(boardPos.x,0,boardPos.y)
            group2.name = meshName;

            this._shelf = group2;

            group2.userData.draggable = true
            group2.userData.name = "shelf"

            this._scene.add(group2)
        


            
    }

    // 창의 크기가 변경될때 발생하는 이벤트
    resize(){
        // 위에서 divContainer로 정의한(#webgl-container div) div의 크기 얻어오기
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width,height);
    }
    
    // time : 렌더링이 처음 시작된 이후 경과된 시간(ms 단위)
    // time은 requestAnimationFrame 함수가 render함수에 전달해준 값이다
    render(time){
        // 랜더링 시에 scene을 카메라의 시점으로 렌더링하도록 만드는 장치
        this._renderer.render(this._scene, this._camera);
        // 속성값을 변경시켜 애니메이션 효과를 만드는 장치
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    // render에서 전달받은 time을 사용하여 애니메이션 효과를 만드는 장치
    update(time){
        time *= 0.001;  // 알아보기 쉽게 ms단위를 초단위로 변경
        // // 정육면체 자동 회전 장치
        //  this._cube.rotation.x = time;
        //  this._cube.rotation.y = time;
    }

}

window.onload = function(){
    new App();
}

