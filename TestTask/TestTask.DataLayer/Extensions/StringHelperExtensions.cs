namespace TestTask.DataLayer.Extensions;

public static class StringHelperExtensions
{
    extension(string str)
    {
        public bool ContainsIgnoreCase(string value)
        {
            return str.ToLowerCase().Contains(value.ToLowerCase());
        }

        public string ToLowerCase()
        {
            str = str.Trim().ToLower();
            return str;
        }
    }
}