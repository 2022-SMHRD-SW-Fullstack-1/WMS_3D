import * as THREE from '../build/three.module.js';
// 마우스를 이용해 Object를 회전시키기 위한 코드
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

// 창고 생성버튼
const btn_create_warehouse = document.querySelector("#btn_create_warehouse")
const warehouse_width = document.querySelector("#warehouse_width");
const warehouse_length = document.querySelector("#warehouse_length");
const warehouse_hegiht = document.querySelector("#warehouse_hegiht");

// three.js의 구성

// 1. Renderer : Scene을 모니터에 렌더링(출력)할 수 있는 장치

// 1-1. Scene : 3차원 객체로 구성되는 장면

// 1-1-1. Light : 3차원 형상을 화면에 표시하기위한 광원
// 1-1-2. Mesh (Object3D) : Object3D의 파생 클래스

// 1-1-2-1. Geometry : 형상을 정의
// 1-1-2-2. Material : 색상 및 투명도 정의

// 1-2. Camera : Scene을 어떤 지점에서 볼지를 정하는 장치

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

        // scene객체 생성
        const scene = new THREE.Scene();
        // 배경색상 설정
        scene.background = new THREE.Color(0.8, 0.8, 0.9);
        // 다른 메서드에서 참조할 수 있도록 field로 정의
        this._scene = scene;

        // 메서드 호출 (아직 정의 X)
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

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
		camera.position.z = 5;
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

        // this._createBoard();

        btn_create_warehouse.addEventListener("click",()=>{this._createBoard(Number(warehouse_width.value),Number(warehouse_length.value),Number(warehouse_hegiht.value))})
        // btn_create_warehouse.addEventListener("click",()=>{this._createBoard(20,40,5)})

    }

    _createBoard(width,length,height){
        
        // 이전에 생성된 창고를 제거하는 장치
        if(this._warehouse){
            for(let i=0;i<this._scene.children.length;i++){
                if(this._scene.children[i].name=="warehouse"){
                    this._scene.children.splice(i,1);
                    break;
                }
            }
        }

        const warehouse = new THREE.Object3D();
        const planeGeometry = new THREE.PlaneGeometry(width/10,length/10,width,length)

        const warehouseMaterial = new THREE.MeshPhongMaterial({
            emissive:0x888888, flatShading:true,color:0x000011
        })

        const group1 = new THREE.Group();
        const warehouseMesh = new THREE.Mesh(planeGeometry,warehouseMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({color: 0xc0c0c0});
        const line = new THREE.LineSegments(
            // WireframeGeometry : 모델의 외각선 표시
            new THREE.WireframeGeometry(planeGeometry),lineMaterial);
        group1.add(warehouseMesh);
        group1.add(line);
        // 판 돌리기
        group1.rotation.x =-Math.PI/2;
        const wallGeometry = new THREE.PlaneGeometry(width/10,height/10,width,height)
        const wallMaterial = new THREE.MeshPhongMaterial({
            emissive:0x666666, flatShading:true,color:0xd0d0d0
        })
        const wallGeometry2 = new THREE.PlaneGeometry(length/10,height/10,length,height)
        const wallMaterial2 = new THREE.MeshPhongMaterial({
            emissive:0x666666, flatShading:true,color:0xc0c0c0
        })
        for(let i=0;i<2;i++){

            let wallMesh2 = new THREE.Mesh(wallGeometry2,wallMaterial2)
            if(i==0){
                wallMesh2.rotation.y = -Math.PI/2;
                wallMesh2.rotation.z = -Math.PI/2;
                wallMesh2.position.z = height/20;
                wallMesh2.position.x = width/20;
            }else{
                wallMesh2.rotation.y = Math.PI/2;
                wallMesh2.rotation.z = -Math.PI/2;
                wallMesh2.position.z = height/20;
                wallMesh2.position.x = -width/20;
            }
            group1.add(wallMesh2)
        }
        for(let i=0; i<2;i++){
            let wallMesh = new THREE.Mesh(wallGeometry,wallMaterial)
            if(i==0){
                wallMesh.rotation.x = -Math.PI/2;
                wallMesh.position.y = -length/20;
                wallMesh.position.z = height/20;
            }else if(i==1){
                wallMesh.rotation.x = Math.PI/2;
                wallMesh.position.y = length/20;
                wallMesh.position.z = height/20;
            }
            group1.add(wallMesh);
        
        }
        warehouse.add(group1);
        
        const mesh = warehouse
        mesh.position.set(0,0,0);

        mesh.name = "warehouse"
        this._scene.add(mesh);

        this._warehouse = warehouse

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
        time *= 0.0003;  // 알아보기 쉽게 ms단위를 초단위로 변경
    }

}

window.onload = function(){
    new App();
}




