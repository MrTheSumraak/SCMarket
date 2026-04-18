import style from './button.module.css'

type TButtonUIType = {
   btnText: string | '',
   img?: string
}

const ButtonUI = ({ btnText, img }: TButtonUIType) => (
   <button className={style.button}>
      {img ? <div className={style.buttonContent}>
         <img className={style.iconBasket} src={img} alt="корзина товаров" />
         <p className={style.buttonText}>{btnText}</p>
      </div> : <p className={style.buttonText}>{btnText}</p>}
   </button>
)

export default ButtonUI