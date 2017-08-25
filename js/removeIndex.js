/**
 * Created by null on 2017/8/9.
 */
function removeIndex() {
    sessionStorage.removeItem('date');
    sessionStorage.removeItem('arr');
    sessionStorage.removeItem('class-left');
    sessionStorage.removeItem('class-top');
    sessionStorage.setItem('selected',56);
    // window.location.reload()
}