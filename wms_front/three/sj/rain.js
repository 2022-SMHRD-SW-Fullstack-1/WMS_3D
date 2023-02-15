import * as THREE from '../build/three.module.js';
// 마우스를 이용해 Object를 회전시키기 위한 코드
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

import {GLTFLoader} from "../examples/jsm/loaders/GLTFLoader.js"

// // 재고 이동 버튼 이벤트
// const move_btn = document.getElementById('move')
// let move_yn = false
// move_btn.addEventListener('click',()=>{
//     if(move_yn == false){
//         move_yn = true
//         move_btn.className = "btn_on"
//     }else {
//         move_yn=false
//         move_btn.className =""
//     }
// })


const warehouse_width = prompt("창고의 너비를 입력해주세요")
const warehouse_length = prompt("창고의 길이를 입력해주세요")
const warehouse_height = prompt("창고의 높이를 입력해주세요")


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
        // 배경 색상 설정
        scene.background = new THREE.Color(0.7,0.7,0.7)
        // 다른 메서드에서 참조할 수 있도록 field로 정의
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
    _setupControls(){
        // OrbitControls : 마우스로 화면을 컨트롤하는 기능
        // OrbitControls객체 = 카메라 객체 + 마우스 이벤트를 받는 Dom요소
        new OrbitControls(this._camera, this._divContainer);
    }
    _setupEvents(){
        
        this._raycaster = new THREE.Raycaster();
        // _clickedPosition : 마우스로 클릭된 scene의 좌표를 참조
        this._raycaster._clickedPosition = new THREE.Vector2();
        // 클릭해서 선택된 매쉬 객체에 대한 참조
        this._raycaster._selectedMesh = null;

        // 마우스 클릭 이벤트
        window.addEventListener("click",(event)=>{
            this._raycaster._clickedPosition.x = (event.clientX / window.innerWidth)*2-1;
            this._raycaster._clickedPosition.y = -(event.clientY / window.innerHeight)*2+1;
            this._raycaster.setFromCamera(this._raycaster._clickedPosition, this._camera);
            
            // 실제 클릭된 mesh를 얻는 코드
            const found = this._raycaster.intersectObjects(this._scene.children);
            if(found.length > 0){
                
                const clickedObj = found[0].object;

                let oldY = this._raycaster._clickedPosition.y;

                // 클릭한 재고 정보 띄우는 장치
                if(clickedObj.name!=""){
                    // 해당 재고가 있는 선반의 위치 (.x .y .z로 구체적으로 알 수 있음)
                    console.log(clickedObj.parent.position);
                    // 해당 선반에서 재고의 위치
                    console.log(clickedObj.position);
                    // 위의 두 값을 더할 때는 선반의 회전 여부도 알아둬야 할 듯
                    console.log("재고명 : "+clickedObj.name);
                    console.log(clickedObj);
                    // clickedObj.parent
                    clickedObj.material.color.set(0xffff00);

                    oldY = clickedObj.position.y;
                }
                
            }else{
                // 아무것도 클릭되지 않았을 경우
                this._raycaster._selectedMesh = null;
            }
        
        
                
        }
    )
    
        // 반응형 웹
        window.onresize = this.resize.bind(this);
        this.resize();

        this._clock = new THREE.Clock();
        requestAnimationFrame(this.render.bind(this));
        
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
        // camera.rotation.x = 30;
        camera.position.y = 1;
        camera.position.z = 1.5;
        camera.position.x = 0.5;
        
        this._camera = camera;
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color,intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }


    _setupModel(){

                // // 3D 모델 가져와서 재고로 띄우기
                // new GLTFLoader().load("./data/cardboard_box.glb",(gltf)=>{
                //     const models = gltf.scene;
                //     this._modelRepository = models;
                //     const mesh = this._modelRepository.getObjectByName("Sketchfab_model");
                //     mesh.position.set(0,-0.8+(stock_info.floor*1),(0.6*shelf_info.length)-(0.6)-(shelf_info.width*stock_info.position))
                //     this._scene.add(mesh)
                //     this._createBoard();
                // })
        this._createBoard();


    }





// 창고 생성
 _createBoard(){



    const width = warehouse_width;
    const length = warehouse_length;
    const height = warehouse_height;


    const wareHouse = new THREE.Object3D();
    const planeGeometry = new THREE.PlaneGeometry(width/10,length/10,width,length)

    
    const wareHouseMaterial = new THREE.MeshPhongMaterial({
        emissive:0x888888, flatShading:true
    })
    const group1 = new THREE.Group();
    const wareHouseMesh = new THREE.Mesh(planeGeometry,wareHouseMaterial);
    // 노란색 라인 생성
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xa0a0a0});
    const line = new THREE.LineSegments(
        // WireframeGeometry : 모델의 외각선 표시
        new THREE.WireframeGeometry(planeGeometry),lineMaterial);
        group1.add(wareHouseMesh);
        group1.add(line);
        // 판 돌리기
        group1.rotation.x =-Math.PI/2;



        const wallGeometry = new THREE.PlaneGeometry(width/10,height/10,width,height)
        const wallMaterial = new THREE.MeshPhongMaterial({
            emissive:0x666666, flatShading:true
        })
        

        
        const wallGeometry2 = new THREE.PlaneGeometry(length/10,height/10,length,height)
        const wallMaterial2 = new THREE.MeshPhongMaterial({
            emissive:0x666666, flatShading:true
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
        
        
        wareHouse.add(group1);
        
    const mesh = wareHouse
    mesh.position.set(0,0,0);
    this._scene.add(mesh);

    this._warehouse = wareHouse
}


// 창고의 크기 얻기
_getBoardPosition(row,col){
    const warehouse = this._warehouse
    const box = new THREE.Box3().setFromObject(warehouse);
    const size = box.max.x - box.min.x;
    const cellWidth = size /10;
    return {
        x: col * cellWidth + cellWidth/2 - size/2,
        y: row * cellWidth + cellWidth/2 - size/2
    }
}
// 선반 크기와 좌표 얻기
_getShelfPosition(name,length,floor){
    // 위에서 만든 선반 가져오기
    const shelf = this._shelf
    const box = new THREE.Box3().setFromObject(shelf);
    const floor_size = box.max.y - box.min.y;
    const floor_cellWidth = floor_size /10;

    console.log(shelf)

    const length_size = box.max.z - box.min.z;
    const length_cellWidth = length_size /10;
    return{
        y: floor * floor_cellWidth + floor_cellWidth/2 - floor_size/2,
        z: length * length_cellWidth + length_cellWidth/2 - floor_cellWidth/2
    }
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
        // this._cube.rotation.x = time;
        // this._cube.rotation.y = time;

        // this._solarSystem.rotation.y = time/2;
        // this._earthOrbit.rotation.y = time;
    }


}

window.onload = function(){
    new App();
}


// progressive imprement
// ctrl + alt + i = 1씩 증가하게 만들어주는 기능
// ctrl + alt + shift + i
// ex) [0,1,2,3,4,5,6,7,8,9,10,11,12]




