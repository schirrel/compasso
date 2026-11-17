using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata;

public class ModelState
{
    public bool Succeeded { get; set; }
    public List<string> Errors { get; set; }

    public ModelState() {
        Errors = new List<string>();
        Succeeded = false;
    }

    public ModelState(IdentityResult result) {
        Errors = new List<string>();
        Succeeded = result.Succeeded;
        foreach (var error in result.Errors)
        {
            Errors.Add(error.Description);
        }
    }
    
    public ModelState(string[] errors) {
        Errors = [.. errors];
    }

    public static ModelState FromResult(IdentityResult result) {
        return new ModelState(result);
    }

    public void AddModelError(string error)
    {
        Errors.Add(error);
    }

}