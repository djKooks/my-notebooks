abstract class AbsIterator {
  type T
  def hasNext: Boolean
  def next: T
}

trait RichIterator extends AbsIterator {
  def foreach(func: T => Unit): Unit = {
    while (hasNext) func(next)
  }
}

class StringIterator(str: String) extends RichIterator {
  type T = Char
  private var i = 0

  override def hasNext: Boolean = i < str.length()

  override def next= {
    val char = str.charAt(i);
    i += 1;
    char
  }
}
